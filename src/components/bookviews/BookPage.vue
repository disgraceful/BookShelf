<template>
  <v-card flat>
    <v-container v-if="loading" class="pa-6">
      <v-row>
        <v-col cols="auto">
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
                  <v-icon
                    :color="isFavorited ? 'red' : 'grey'"
                    v-text="isFavorited ? 'mdi-heart' : 'mdi-heart-outline'"
                  >
                  </v-icon
                ></v-btn>
              </template>
              <span v-text="isFavorited ? 'Favorite' : 'Unfavorite'"></span>
            </v-tooltip>
          </div>
          <v-rating
            class="pt-4"
            v-model="rating"
            hover
            @input="updateBook"
          ></v-rating>
          <div v-if="rating > 0" class="text-center title font-weight-regular">
            My rating: {{ rating > 0 ? rating : "" }}
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
            >{{ shrinkedDescription }}
            <a @click="shortenDesc = !shortenDesc">
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
                  :class="[item.collection === bookStatus ? activeClass : '']"
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
          <v-row class="pt-10" v-if="bookStatus == 'reading'">
            <v-col>
              <v-slider
                label="I'm on page': "
                min="0"
                :max="book.pages"
                v-model="pagesRead"
                thumb-label="always"
                :thumb-size="24"
              >
              </v-slider>
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
const bookService = ServiceFactory.get("book");
const userService = ServiceFactory.get("user");
export default {
  data() {
    return {
      book: {},
      defaultImg: "../../assets/goodreads.png",
      rating: 0,
      isFavorited: false,
      pagesRead: 0,
      bookStatus: "",
      bookStatusButtons: [
        {
          title: "Finished",
          collection: "finished",
          clickHandler: this.addToUserCollection
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
      shortenDesc: false,
      error: false
    };
  },
  props: ["id"],
  components: {
    "bs-loader": Preloader,
    "bs-error": ErrorPage
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
      return this.shortenDesc ? " ...more" : " less ";
    },
    errorComponent() {
      return this.error ? "bs-error" : "";
    },
    shrinkedDescription() {
      let words = this.book.description.split(" ");
      if (this.shortenDesc) {
        let shortDesc = words.splice(0, 70).join(" ");
        return shortDesc;
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
        this.isFavorited = this.book.isFavorited || false;
        this.pagesRead = this.book.pagesRead || 0;
        this.bookStatus = this.book.status || "not reading";
        this.rating = this.book.rating || 0;
        this.loading = true;
        this.shortenDesc = this.book.description.split(" ").length > 100;
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
        pagesRead: this.pagesRead,
        pages: this.pages,
        rating: this.rating,
        isFavorited: this.isFavorited,
        status: this.bookStatus
      };
    },

    async addToUserCollection(collection) {
      if (!collection || this.bookStatus === collection) return;
      try {
        const bookRecord = this.createBookRecord();
        bookRecord.status = collection;
        const result = await userService.addToUserCollection(
          this.user.token,
          bookRecord,
          collection
        );
        this.bookStatus = result.status;
        console.log(result);
      } catch (error) {
        this.loading = false;
        this.error = error.body;
      }
    },

    async removeFromCollection(collection) {
      if (!collection || this.bookStatus === collection) return;
      try {
        const result = await userService.removeFromUserCollection(
          this.user.token,
          this.book.id
        );
        console.log(result);
        if (result) this.bookStatus = result.status;
      } catch (error) {
        this.loading = false;
        this.error = error.body;
      }
    },

    async favoriteBook() {
      this.isFavorited = !this.isFavorited;
      try {
        const bookRecord = this.createBookRecord();
        const result = await userService.setFavorite(
          this.user.token,
          bookRecord
        );
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
