<template>
  <v-card flat>
    <v-container v-if="loading" class="pa-6">
      <v-row>
        <v-col cols="auto">
          <div style="position:relative">
            <v-img :src="book.imageUrl" content> </v-img>
            <v-tooltip bottom content-class="tooltip">
              <template v-slot:activator="{ on }">
                <v-btn
                  fab
                  small
                  absolute
                  top
                  right
                  v-on="on"
                  @click="isFavorited = !isFavorited"
                >
                  <v-icon :color="isFavorited ? 'red' : 'grey'"
                    >mdi-star</v-icon
                  ></v-btn
                >
              </template>
              <span v-text="isFavorited ? 'Favorite' : 'Unfavorite'"></span>
            </v-tooltip>
          </div>
          <v-rating class="pt-2" v-model="rating" hover></v-rating>
          <div class="text-center title font-weight-regular">
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
            class="pb-0 subtitle-1 "
            v-text="`Goodreads rating: ${book.goodreadsRating}`"
          >
          </v-card-text>
          <v-card-text
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
          <v-card-text class="subtitle-1 text-justify mb-2">{{
            book.description
          }}</v-card-text>
          <v-divider></v-divider>
          <v-toolbar flat dense class="justify-center">
            <v-toolbar-items>
              <template v-for="(item, index) in bookStatusButtons">
                <v-btn
                  text
                  :key="item.title"
                  :class="[item.collection === bookStatus ? activeClass : '']"
                  @click="addToUserCollection(item.collection)"
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
        </v-col>
      </v-row>
      <v-row class="pt-10" justify="center">
        <v-col cols="8">
          <v-slider
            label="I read pages"
            min="0"
            :max="book.pages"
            v-model="pagesRead"
            thumb-label="always"
            :thumb-size="24"
          >
          </v-slider>
        </v-col>
      </v-row>
    </v-container>
    <bs-loader
      v-if="!loading"
      :options="{
        isDetermined: true,
        color: 'teal',
        size: '100',
        width: '10',
        wrapperClass: loaderWrapper
      }"
    ></bs-loader>
  </v-card>
</template>

<script>
import { ServiceFactory } from "../../services/serviceFactory";
import Preloader from "../shared/Preloader";
const bookService = ServiceFactory.get("book");
const userService = ServiceFactory.get("user");
export default {
  data() {
    return {
      book: {},
      rating: 0,
      isFavorited: false,
      pagesRead: 0,
      bookStatus: "",
      bookStatusButtons: [
        {
          title: "Finished",
          collection: "finished"
        },
        {
          title: "Reading",
          collection: "reading"
        },
        {
          title: "2Read",
          collection: "toread"
        },
        {
          title: "Stopped",
          collection: "stopped"
        },
        {
          title: "Not Reading",
          collection: null
        }
      ],
      activeClass: "active",
      loaderWrapper: "loader-wrapper",
      loading: false
    };
  },
  props: ["id"],
  components: {
    "bs-loader": Preloader
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
    }
  },
  methods: {
    async getBookInfo() {
      this.loading = false;
      this.book = await bookService.getBookById(this.id, this.user.token);
      this.isFavorited = this.book.isFavorited || false;
      this.pagesRead = this.book.pagesRead || 0;
      this.bookStatus = this.book.status || null;
      console.log(this.book);
      this.loading = true;
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
        isFavorited: this.isFavorited
      };
    },

    async addToUserCollection(collection) {
      if (!collection || this.bookStatus === collection) return;
      const bookRecord = this.createBookRecord();
      bookRecord.status = collection;
      const result = await userService.addToUserCollection(
        this.user.token,
        bookRecord,
        collection
      );
      this.bookStatus = result.status;
      console.log(result);
    }
  },
  mounted() {
    console.log("fetching book");
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
</style>
