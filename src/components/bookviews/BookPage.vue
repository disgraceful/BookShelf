<template>
  <v-card flat>
    <v-container v-if="book && !error" class="pa-6 page-container">
      <v-row dense :justify="$mq === 'xs' ? 'center' : 'space-around'">
        <v-col :cols="$mq | mq({ xs: '2', sm: 3 })" style="min-width:240px">
          <v-col>
            <div style="position:relative">
              <v-img :src="book.imageUrl || defaultImg" content> </v-img>
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
                    @click="favoriteBook"
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
              @input="updateBook"
            ></v-rating>
          </v-col>
          <v-col class="pb-0" v-if="$mq === 'sm' || $mq === 'xs'">
            <v-select
              background-color="teal"
              dark
              v-model="statusTemp"
              :items="avaliableStatus"
              item-text="text"
              item-value="status"
              :menu-props="{ offsetY: true }"
              solo
              @input="handleCollection(book.userData.statusTemp)"
            ></v-select>
          </v-col>
        </v-col>
        <v-col :cols="$mq | mq({ xs: 'auto', sm: '', md: 8, lg: 9 })">
          <bs-book-info :book="book"></bs-book-info>
          <v-divider v-if="$mq !== 'sm' && $mq !== 'xs'"></v-divider>
          <v-toolbar flat dense v-if="$mq !== 'sm' && $mq !== 'xs'">
            <v-toolbar-items>
              <template v-for="(item, index) in avaliableStatus">
                <v-btn
                  text
                  :key="item.status"
                  :class="[
                    item.status === book.userData.status ? activeClass : ''
                  ]"
                  @click="handleCollection(item.status)"
                  >{{ item.text }}
                </v-btn>
                <v-divider
                  vertical
                  :key="index"
                  v-if="index < avaliableStatus.length - 1"
                ></v-divider>
              </template>
            </v-toolbar-items>
          </v-toolbar>
          <v-dialog v-model="finishDialog" max-width="600">
            <bs-finish-dialog
              :book="book"
              @posted="finishBook"
            ></bs-finish-dialog>
          </v-dialog>
          <v-row class="pt-10" v-if="book.userData.status === 'reading'">
            <v-col>
              <v-slider
                label="I'm on page: "
                min="0"
                :max="book.pages"
                v-model="book.userData.pagesRead"
                thumb-label="always"
                :thumb-size="24"
              >
              </v-slider>
            </v-col>
            <v-col cols="auto">
              <v-btn
                depressed
                color="teal"
                class="white--text"
                @click="updateBook"
                >Update progress</v-btn
              >
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row v-if="book.userData.status === 'finished'">
        <v-col>
          <bs-book-activity :userData="book.userData"></bs-book-activity>
        </v-col>
      </v-row>
    </v-container>
    <bs-loader
      v-if="loading && !error"
      :options="{
        isDetermined: true,
        color: 'teal',
        size: '100',
        width: '10'
      }"
    ></bs-loader>
    <component v-if="error" :is="errorComponent" :error="error"></component>
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
const bookService = ServiceFactory.get("book");
const userService = ServiceFactory.get("user");
export default {
  data() {
    return {
      book: null,
      statusTemp: null,
      defaultImg: "../../assets/goodreads.png",
      activeClass: "active",
      loading: true,
      error: false,
      finishDialog: false
    };
  },
  props: ["id"],
  mixins: [bookStatus],
  components: {
    "bs-loader": Preloader,
    "bs-error": ErrorPage,
    "bs-finish-dialog": FinishBookDialog,
    "bs-book-info": BookInfo,
    "bs-book-activity": UserBookActivity
  },
  watch: {
    $route(to, from) {
      if (to.path.includes("/book") || to.path === from.path) {
        this.getBookInfo();
      }
    }
  },
  computed: {
    user() {
      return this.$store.getters.getAuthUser;
    },
    errorComponent() {
      return this.error ? "bs-error" : "";
    }
  },
  methods: {
    async getBookInfo() {
      try {
        this.book = null;
        this.loading = true;
        this.book = await bookService.getBookById(this.id, this.user.token);
        this.statusTemp = this.book.userData.status;
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.error = error.body;
      }
    },

    async favoriteBook() {
      try {
        const result = await userService.setFavorite(
          this.user.token,
          this.book
        );
        if (result) {
          console.log(result);
          this.book.userData.isFavorited = result.userData.isFavorited;
        }
      } catch (error) {
        console.log(error);
        this.error = error.body;
      }
    },

    async updateBook() {
      try {
        const result = await userService.updateBook(this.user.token, this.book);
        console.log(result);
      } catch (error) {
        console.log(error);
        this.error = error.body;
      }
    }
  },
  mounted() {
    this.getBookInfo();
  }
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
