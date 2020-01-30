<template>
  <v-card flat>
    <v-container>
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
    <v-divider></v-divider>
  </v-card>
</template>

<script>
import { ServiceFactory } from "../../services/serviceFactory";
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
          collection: "finished",
          to: ""
        },
        {
          title: "Reading",
          collection: "reading",
          to: ""
        },
        {
          title: "2Read",
          collection: "toread",
          to: ""
        },
        {
          title: "Stopped",
          collection: "stopped",
          to: ""
        },
        {
          title: "Not Reading",
          collection: null,
          to: ""
        }
      ],
      activeClass: "active"
    };
  },
  props: ["id"],
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
    loading() {
      return this.$store.getters.getLoading;
    }
  },
  methods: {
    async getBookInfo() {
      this.book = await bookService.getBookById(this.id, this.user.token);
      this.isFavorited = this.book.isFavorited || false; //temporary
      this.pagesRead = this.book.pagesRead || 0;
      this.bookStatus = this.book.status || null;
      console.log(this.book);
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
</style>
