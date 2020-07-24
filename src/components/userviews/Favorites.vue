<template>
  <v-card flat>
    <v-container v-if="books" class="page-container">
      <v-card-title class="headline py-2">Favorites</v-card-title>
      <v-card-title class="font-weight-regular py-2">Favorite books</v-card-title>
      <v-row>
        <v-col cols="auto" v-for="book in books" :key="book.id">
          <bs-fav-book :book="book"></bs-fav-book>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-card-title class="font-weight-regular">Favorite authors</v-card-title>
    </v-container>
    <bs-loader v-if="loading && !error"></bs-loader>
  </v-card>
</template>

<script>
import FavoriteBook from "../bookviews/FavoriteBook";
import Loader from "../shared/Preloader";
import { ServiceFactory } from "../../services/serviceFactory";

const userService = ServiceFactory.get("user");
export default {
  components: {
    "bs-fav-book": FavoriteBook,
    "bs-loader": Loader
  },
  data() {
    return {
      books: null,
      loading: true,
      error: null
    };
  },
  computed: {
    user() {
      return this.$store.getters.getAuthUser;
    }
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  async created() {
    this.books = null;
    this.loading = true;
    const response = await userService.getAllUserBooks();
    this.books = response.body;
    this.books = this.books.filter(book => book.userData.isFavorited);
    this.loading = false;
  }
};
</script>
