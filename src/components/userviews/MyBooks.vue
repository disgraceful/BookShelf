<template>
  <v-card flat>
    <v-container v-if="books" class="page-container">
      <v-card-title class="headline py-2">Uploaded Books</v-card-title>
      <v-row>
        <v-col cols="auto" v-for="book in books" :key="book.id">
          <bs-fav-book :book="book"></bs-fav-book>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-col cols="auto">
          <v-btn @click.stop="dialogActive=true">Upload</v-btn>
        </v-col>
      </v-row>
    </v-container>
    <bs-loader v-if="loading"></bs-loader>
    <v-dialog v-model="dialogActive" max-width="700">
      <bs-upload-dialog></bs-upload-dialog>
    </v-dialog>
  </v-card>
</template>

<script>
import BookUploadDialog from "../bookviews/BookUploadDialog.vue";
import FavoriteBook from "../bookviews/FavoriteBook.vue";
import Preloader from "../shared/Preloader";

export default {
  components: {
    "bs-upload-dialog": BookUploadDialog,
    "bs-fav-book": FavoriteBook,
    "bs-loader": Preloader
  },
  data() {
    return {
      dialogActive: false,
      loading: false,
      books: null
    };
  },
  created() {
    this.books = [];
    this.books.push({
      imageUrl: require("../../assets/goodreads.png"),
      userData: { isFavorited: false },
      id: "1223-fake",
      title: "Fake Book",
      authors: "Fake Guy"
    });
  }
};
</script>