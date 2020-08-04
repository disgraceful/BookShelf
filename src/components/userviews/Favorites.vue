<template>
  <v-card flat>
    <v-container v-if="books" class="page-container">
      <v-card-title class="headline py-2">Favorites</v-card-title>
      <v-card-title class="font-weight-regular py-2">Favorite books</v-card-title>
      <v-row>
        <v-col cols="auto" v-for="book in books" :key="book.id">
          <bs-display-book :book="book">
            <template v-slot:actions>
              <v-btn fab small absolute top right color="white" @click="favorite">
                <v-icon
                  :color="book.userData.isFavorited ? 'red' : 'grey'"
                >{{ book.userData.isFavorited ? "mdi-heart" : "mdi-heart-outline" }}</v-icon>
              </v-btn>
            </template>
          </bs-display-book>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-card-title class="font-weight-regular">Favorite authors</v-card-title>
    </v-container>
    <bs-loader v-if="loading && !error"></bs-loader>
  </v-card>
</template>

<script>
import GenericDisplayBook from "../bookviews/GenericDisplayBook";
import Loader from "../shared/Preloader";
import bookLogic from "../../mixins/bookLogic";
import { ServiceFactory } from "../../services/serviceFactory";
const userService = ServiceFactory.get("user");
export default {
  components: {
    "bs-display-book": GenericDisplayBook,
    "bs-loader": Loader
  },
  mixins: [bookLogic],
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
  methods: {
    favorite() {
      this.favoriteBook();
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
