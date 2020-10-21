<template>
  <v-card flat>
    <v-container v-if="book && !error" class="pa-6 page-container">
      <v-row dense :justify="xs ? 'center' : 'space-around'">
        <v-col :cols="$mq | mq({ xs: 2, sm: 3 })" style="min-width: 240px">
          <v-col>
            <div style="position: relative">
              <v-img :src="book.imageUrl || defaultImg" content></v-img>
              <v-tooltip bottom content-class="tooltip">
                <template v-slot:activator="{ on }">
                  <v-btn
                    fab
                    small
                    absolute
                    top
                    right
                    v-on="on"
                    color="white"
                    @click="favorite"
                  >
                    <v-icon :color="book.userData.isFavorited ? 'red' : 'grey'">
                      {{
                        book.userData.isFavorited
                          ? "mdi-heart"
                          : "mdi-heart-outline"
                      }}
                    </v-icon>
                  </v-btn>
                </template>
                <span
                  v-text="book.userData.isFavorited ? 'Unfavorite' : 'Favorite'"
                ></span>
              </v-tooltip>
            </div>
          </v-col>
          <v-col
            class="py-0"
            v-if="
              book.userData.status !== 'not reading' &&
              book.userData.status !== '2read'
            "
          >
            <v-rating
              v-model="book.userData.rating"
              hover
              medium
              @input="update"
            ></v-rating>
          </v-col>
          <v-col class="pb-0" v-if="!mdH">
            <v-select
              background-color="teal"
              dark
              v-model="statusTemp"
              :items="avaliableStatus"
              item-text="text"
              item-value="status"
              :menu-props="{ offsetY: true }"
              solo
              @input="handleCollection(statusTemp)"
            ></v-select>
          </v-col>
        </v-col>
        <v-col :cols="$mq | mq({ xs: 'auto', sm: '', md: 8, lg: 9 })">
          <bs-book-info :book="book"></bs-book-info>
          <v-divider v-if="mdH"></v-divider>
          <v-toolbar flat dense v-if="mdH">
            <v-toolbar-items>
              <template v-for="(item, index) in avaliableStatus">
                <v-btn
                  text
                  :key="item.status"
                  :class="
                    item.status === book.userData.status ? activeClass : ''
                  "
                  @click="handleCollection(item.status)"
                  >{{ item.text }}</v-btn
                >
                <v-divider
                  vertical
                  :key="index"
                  v-if="index < avaliableStatus.length - 1"
                ></v-divider>
              </template>
            </v-toolbar-items>
          </v-toolbar>

          <bs-finish-dialog
            :dialog="finishDialog"
            :book="book"
            @input="finishDialog = $event"
            @posted="finishBook"
          ></bs-finish-dialog>

          <v-row
            class="pt-10"
            v-if="book.userData.status === 'reading'"
            :justify="mdH ? 'start' : 'center'"
            :no-gutters="!mdH"
          >
            <v-col :cols="mdH ? '' : 12">
              <v-slider
                label="I'm on page: "
                min="0"
                :max="book.pages"
                v-model="book.userData.pagesRead"
                thumb-label="always"
                :thumb-size="24"
              ></v-slider>
            </v-col>
            <v-col cols="auto">
              <v-btn depressed color="teal" class="white--text" @click="update"
                >Update progress</v-btn
              >
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row v-if="book.userData.status === 'finished'">
        <v-col>
          <bs-book-activity :book="book"></bs-book-activity>
        </v-col>
      </v-row>
    </v-container>
    <bs-loader v-if="loading && !error"></bs-loader>
    <bs-error-page v-if="error" :error="error"></bs-error-page>
  </v-card>
</template>

<script>
import Preloader from "../shared/Preloader";
import ErrorPage from "../shared/ErrorPage";
import FinishBookDialog from "./FinishBookDialog";
import BookInfo from "./BookInfo";
import UserBookActivity from "./UserBookActivity";
import { ServiceFactory } from "../../services/serviceFactory";
import bookStatus from "../../mixins/bookStatus";
import mediaQuery from "../../mixins/mediaQueryLogic";
const bookService = ServiceFactory.get("book");
const uploadService = ServiceFactory.get("upload");
const userService = ServiceFactory.get("user");

export default {
  props: {
    id: String,
  },
  mixins: [bookStatus, mediaQuery],
  components: {
    "bs-loader": Preloader,
    "bs-error-page": ErrorPage,
    "bs-finish-dialog": FinishBookDialog,
    "bs-book-info": BookInfo,
    "bs-book-activity": UserBookActivity,
  },

  data() {
    return {
      book: null,
      statusTemp: null,
      defaultImg: require("../../assets/goodreads.png"),
      activeClass: "active",
      loading: true,
      error: null,
      finishDialog: false,
    };
  },

  watch: {
    $route(to, from) {
      if (to.params.id !== to.params.id || to.params.search) {
        this.getBook();
      }
    },
  },

  methods: {
    favorite() {
      userService
        .setFavorite(this.book)
        .then((response) => {
          this.book.userData.isFavorited = response.body.userData.isFavorited;
        })
        .catch((error) => {
          this.error = error.body;
        });
    },

    update() {
      userService.updateBook(this.book).catch((error) => {
        console.log(error);
        this.error = error.body;
      });
    },

    async getBook() {
      try {
        this.book = null;
        this.loading = true;
        let response;
        if (isNaN(this.id)) {
          response = await uploadService.getPrivateBookById(this.id);
        } else {
          response = await bookService.getBookById(this.id);
        }
        this.book = response.body;
        this.statusTemp = this.book.userData.status;
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.error = error.body;
      }
    },
  },

  async created() {
    await this.getBook();
  },
};
</script>

<style scoped>
.active {
  background-color: #009688;
  color: #fff;
}

.tooltip {
  background-color: #f1f1f1;
  color: #000;
  font-weight: 500;
}

.v-toolbar__content {
  justify-content: center !important;
}
</style>
