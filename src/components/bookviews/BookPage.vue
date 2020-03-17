<template>
  <v-card flat>
    <v-container v-if="book && !error" class="pa-6 page-container">
      <v-row dense justify="center">
        <v-col
          :cols="$mq | mq({ xs: 'auto', sm: 3, md: 3, lg: 3 })"
          style="min-width:240px"
        >
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
              v-model="book.userData.status"
              :items="avaliableStatus"
              :menu-props="{ offsetY: true }"
              solo
            ></v-select>
          </v-col>
        </v-col>
        <v-col :cols="$mq | mq({ xs: 12, sm: 5, md: 8, lg: 9 })">
          <bs-book-info :book="book"></bs-book-info>
          <v-divider v-if="$mq !== 'sm' && $mq !== 'xs'"></v-divider>
          <v-toolbar flat dense v-if="$mq !== 'sm' && $mq !== 'xs'">
            <v-toolbar-items>
              <template v-for="(item, index) in bookStatusButtons">
                <v-btn
                  text
                  :key="item.title"
                  :class="[
                    item.collection === book.userData.status ? activeClass : ''
                  ]"
                  @click="item.clickHandler(item.collection)"
                  >{{ item.title }}
                </v-btn>
                <v-divider
                  vertical
                  :key="index"
                  v-if="index < bookStatusButtons.length - 1"
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
        width: '10',
        wrapperClass: loaderWrapper
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
      defaultImg: "../../assets/goodreads.png",
      bookStatusButtons: [
        {
          title: "Finished",
          collection: "finished",
          clickHandler: () => (this.finishDialog = true)
        },
        {
          title: "Reading",
          collection: "reading",
          clickHandler: this.addToUserCollection
        },
        {
          title: "2Read",
          collection: "2read",
          clickHandler: this.addToUserCollection
        },
        {
          title: "Stopped",
          collection: "stopped",
          clickHandler: this.addToUserCollection
        },
        {
          title: "Not Reading",
          collection: "not reading",
          clickHandler: this.removeFromCollection
        }
      ],
      activeClass: "active",
      loaderWrapper: "loader-wrapper",
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
        // this.status = this.book.userData.status.replace(/^\w/, char =>
        //   char.toUpperCase()
        // );
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.error = error.body;
      }
    },

    async finishBook(eventBook) {
      this.finishDialog = false;
      this.book = eventBook;
      console.log(this.book);
      this.book.userData.pagesRead = this.book.pages;
      await this.addToUserCollection("finished");
    },

    async addToUserCollection(collection) {
      if (!collection || this.book.status === collection) return;
      try {
        const result = await userService.addToUserCollection(
          this.user.token,
          this.book,
          collection
        );
        this.book.userData.status = result.userData.status;
      } catch (error) {
        this.loading = false;
        this.error = error.body;
      }
    },

    async removeFromCollection(collection) {
      if (this.book.userData.status === collection) return;
      try {
        const result = await userService.removeFromUserCollection(
          this.user.token,
          this.book.id
        );
        if (result) this.book.userData = result.userData;
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
        this.loading = false;
        this.error = error.body;
      }
    },
    async updateBook() {
      try {
        const result = await userService.updateBook(this.user.token, this.book);
        console.log(result);
      } catch (error) {
        console.log(error);
        this.loading = false;
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
  background-color: teal;
  color: #fff;
}

.tooltip {
  background-color: #f1f1f1;
  color: #000;
  font-weight: 500;
}

.loader-wrapper {
  display: flex;
  position: relative;
  top: 240px;
  justify-content: center;
}

.v-toolbar__content {
  justify-content: center !important;
}
</style>
