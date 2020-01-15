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
                  :class="[item.active ? activeClass : '']"
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
    </v-container>
    <v-divider></v-divider>
  </v-card>
</template>

<script>
import { ServiceFactory } from "../../services/serviceFactory";
const bookService = ServiceFactory.get("book");
export default {
  data() {
    return {
      book: {},
      rating: 0,
      isFavorited: false,
      bookStatusButtons: [
        {
          title: "Reading",
          to: "",
          active: false
        },
        {
          title: "2Read",
          to: "",
          active: false
        },
        {
          title: "Stopped",
          to: "",
          active: false
        },
        {
          title: "Not Reading",
          to: "",
          active: true
        }
      ],
      activeClass: "active"
    };
  },
  props: ["id"],
  watch: {
    $route(to) {
      if (to.path.includes("/book")) this.getBookInfo();
    }
  },
  methods: {
    async getBookInfo() {
      this.book = await bookService.getBookById(this.id);
    }
  },
  created() {
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
