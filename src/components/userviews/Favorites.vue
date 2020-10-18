<template>
  <v-card flat>
    <v-container v-if="books && !error">
      <v-card-title class="text-h5 py-2">Favorites</v-card-title>
      <v-divider></v-divider>
      <v-row v-if="!noFavorites" :justify="xs ? 'center' : 'start'">
        <v-col cols="auto" v-for="(book, i) in favorites" :key="book.id">
          <bs-display-book :book="book">
            <template v-slot:actions>
              <v-btn
                fab
                small
                absolute
                top
                right
                color="white"
                :loading="loading && bookIndex == i"
                @click="favorite(book, i)"
              >
                <v-icon :color="book.userData.isFavorited ? 'red' : 'grey'">{{
                  book.userData.isFavorited ? "mdi-heart" : "mdi-heart-outline"
                }}</v-icon>
              </v-btn>
            </template>
          </bs-display-book>
        </v-col>
      </v-row>
      <v-card-text v-if="noFavorites" class="text-h6 font-weight-regular"
        >Looks like you haven't favorite any books yet! Use heart button on book
        pages to mark your favorites!</v-card-text
      >
    </v-container>
    <bs-loader v-if="loading && bookIndex < 0"></bs-loader>
    <bs-error-page v-if="error" :error="error"></bs-error-page>
  </v-card>
</template>

<script>
import GenericDisplayBook from "../bookviews/GenericDisplayBook";
import Loader from "../shared/Preloader";
import ErrorPage from "../shared/ErrorPage";
import mediaQuery from "../../mixins/mediaQueryLogic";
import { ServiceFactory } from "../../services/serviceFactory";
const userService = ServiceFactory.get("user");
export default {
  mixins: [mediaQuery],
  components: {
    "bs-display-book": GenericDisplayBook,
    "bs-loader": Loader,
    "bs-error-page": ErrorPage,
  },

  data() {
    return {
      books: null,
      loading: true,
      error: null,
      bookIndex: -1,
    };
  },

  computed: {
    favorites() {
      return this.books
        ? this.books.filter((book) => book.userData.isFavorited)
        : [];
    },

    noFavorites() {
      return this.favorites.length <= 0;
    },
  },

  methods: {
    async favorite(book, index) {
      this.bookIndex = index;
      this.loading = true;
      userService
        .setFavorite(book)
        .then((response) => {
          let res = response.body;
          let index = this.books.findIndex((b) => b.id === res.id);
          this.books.splice(index, 1, res);
          this.bookIndex = -1;
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          this.error = error.body;
          this.bookIndex = -1;
          this.loading = false;
        });
    },
  },

  created() {
    this.books = null;
    this.loading = true;
    userService
      .getAllUserBooks()
      .then((response) => {
        this.books = response.body;
        this.loading = false;
      })
      .catch((error) => {
        this.error = error;
        this.loading = false;
      });
  },
};
</script>
