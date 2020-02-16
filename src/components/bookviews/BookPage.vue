<template>
  <v-card flat>
    <v-container v-if="loading" class="pa-6">
      <v-row>
        <v-col cols="4" md="3">
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
                    <v-icon :color="book.isFavorited ? 'red' : 'grey'">
                      {{ book.isFavorited ? "mdi-heart" : "mdi-heart-outline" }}
                    </v-icon></v-btn
                  >
                </template>
                <span
                  v-text="book.isFavorited ? 'Unfavorite' : 'Favorite'"
                ></span>
              </v-tooltip>
            </div>
          </v-col>
          <div
            class="d-flex justify-center flex-column"
            v-if="book.status !== 'not reading' && book.status !== 'toread'"
          >
            <v-rating
              class="pt-4"
              v-model="book.rating"
              hover
              medium
              @input="updateBook"
            ></v-rating>
          </div>
        </v-col>
        <v-col>
          <v-card-title class="pt-0 headline font-weight-medium">{{
            book.title
          }}</v-card-title>
          <v-card-subtitle v-if="book.series" class="title">{{
            book.series.fullName
          }}</v-card-subtitle>
          <v-card-text class="pb-0 subtitle-1">
            <span>by </span>
            <span
              v-for="(author, i) in book.authors"
              :key="i"
              v-text="
                i < book.authors.length - 1 ? `${author.name}, ` : author.name
              "
            ></span>
          </v-card-text>
          <v-card-text
            v-if="book.goodreadsRating"
            class="pb-0 subtitle-1 "
            v-text="`Goodreads rating: ${book.goodreadsRating}`"
          >
          </v-card-text>
          <v-card-text
            v-if="book.publishedYear"
            class="pb-0 pt-1 subtitle-1"
            v-text="`Published in: ${book.publishedYear}`"
          >
          </v-card-text>
          <v-card-text
            class="pb-0 pt-1 subtitle-1"
            v-text="`Pages: ${book.pages}`"
          >
          </v-card-text>
          <v-card-text class="pb-0 pt-1 subtitle-1">
            <span>Genres: </span>
            <span
              v-for="(genre, i) in book.genres"
              :key="i"
              v-text="i < book.genres.length - 1 ? `${genre}, ` : genre"
            ></span>
          </v-card-text>
          <v-card-text
            v-if="book.description"
            class="subtitle-1 text-justify mb-2"
            style="white-space: pre-line"
          >
            {{ shrinkedDescription }}
            <a
              @click="shrinked = !shrinked"
              v-if="splitDescription.length > 100"
            >
              {{ expandLink }}</a
            ></v-card-text
          >
          <v-divider></v-divider>
          <v-toolbar flat dense color="#fafafa">
            <v-toolbar-items>
              <v-spacer></v-spacer>
              <template v-for="(item, index) in bookStatusButtons">
                <v-btn
                  text
                  :key="item.title"
                  :class="[item.collection === book.status ? activeClass : '']"
                  @click="item.clickHandler(item.collection)"
                  >{{ item.title }}
                </v-btn>
                <v-divider
                  vertical
                  :key="index"
                  v-if="index < bookStatusButtons.length - 1"
                ></v-divider>
              </template>
              <v-spacer></v-spacer>
            </v-toolbar-items>
          </v-toolbar>
          <v-dialog v-model="finishDialog" max-width="600">
            <bs-finish-dialog
              :book="book"
              @posted="finishBook"
            ></bs-finish-dialog>
          </v-dialog>
          <v-row class="pt-10" v-if="book.status == 'reading'">
            <v-col>
              <v-slider
                label="I'm on page: "
                min="0"
                :max="book.pages"
                v-model="book.pagesRead"
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
    </v-container>
    <bs-loader
      v-if="!loading && !error"
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
import { ServiceFactory } from "../../services/serviceFactory";
import Preloader from "../shared/Preloader";
import ErrorPage from "../shared/ErrorPage";
import FinishBookDialog from "./FinishBookDialog";
const bookService = ServiceFactory.get("book");
const userService = ServiceFactory.get("user");
export default {
  data() {
    return {
      book: {},
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
          collection: "toread",
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
      loading: false,
      error: false,
      finishDialog: false,
      splitDescription: "",
      shrinked: true
    };
  },
  props: ["id"],
  components: {
    "bs-loader": Preloader,
    "bs-error": ErrorPage,
    "bs-finish-dialog": FinishBookDialog
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
    expandLink() {
      return this.shrinked ? "...more" : "less";
    },
    errorComponent() {
      return this.error ? "bs-error" : "";
    },
    isShrinked() {
      return this.splitDescription.length > 100;
    },
    shrinkedDescription() {
      if (this.shrinked && this.splitDescription.length > 100) {
        let shortDesc = this.splitDescription;
        return shortDesc.slice(0, 70).join(" ");
      } else {
        return this.book.description;
      }
    }
  },
  methods: {
    async getBookInfo() {
      try {
        this.loading = false;
        this.book = await bookService.getBookById(this.id, this.user.token);
        this.loading = true;
        this.splitDescription = this.book.description.split(" ");
      } catch (error) {
        this.loading = false;
        this.error = error.body;
      }
    },

    createBookRecord() {
      return {
        id: this.book.id,
        title: this.book.title,
        imageUrl: this.book.imageUrl,
        author: this.book.authors[0].name,
        series: this.book.series.fullName,
        genres: this.book.genres,
        pagesRead: this.book.pagesRead,
        pages: +this.book.pages,
        rating: this.book.rating,
        isFavorited: this.book.isFavorited,
        status: this.book.status
      };
    },

    async finishBook(event) {
      this.finishDialog = false;
      this.book = event;
      const bookRecord = this.createBookRecord();
      bookRecord.userData = event.userData;
      bookRecord.status = "finished";
      bookRecord.pagesRead = this.book.pages;
      const result = await userService.updateBook(this.user.token, bookRecord);
    },

    async addToUserCollection(collection) {
      if (!collection || this.book.status === collection) return;
      try {
        const bookRecord = this.createBookRecord();
        bookRecord.status = collection;
        const result = await userService.addToUserCollection(
          this.user.token,
          bookRecord,
          collection
        );
        this.book.status = result.status;
        console.log(result);
      } catch (error) {
        this.loading = false;
        this.error = error.body;
      }
    },

    async removeFromCollection(collection) {
      if (!collection || this.book.status === collection) return;
      try {
        const result = await userService.removeFromUserCollection(
          this.user.token,
          this.book.id
        );
        console.log(result);
        if (result) this.book.status = result.status;
      } catch (error) {
        this.loading = false;
        this.error = error.body;
      }
    },

    async favoriteBook() {
      this.book.isFavorited = !this.book.isFavorited;
      try {
        const bookRecord = this.createBookRecord();
        const result = await userService.setFavorite(
          this.user.token,
          bookRecord
        );
        if (result) this.book.isFavorited = result.isFavorited;
      } catch (error) {
        console.log(error);
        this.loading = false;
        this.error = error.body;
      }
    },
    async updateBook() {
      try {
        const bookRecord = this.createBookRecord();
        const result = await userService.updateBook(
          this.user.token,
          bookRecord
        );
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
a:hover {
  text-decoration: underline;
}
</style>
