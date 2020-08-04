<template>
  <v-card flat>
    <v-container v-if="books" class="page-container">
      <v-card-title class="headline py-2">Uploaded Books</v-card-title>
      <v-row>
        <v-col cols="auto" v-for="book in books" :key="book.id">
          <v-hover v-slot:default="{hover}">
            <bs-display-book :book="book">
              <template v-slot:actions>
                <v-btn
                  fab
                  small
                  absolute
                  top
                  right
                  color="white"
                  @click="remove"
                  :style="{opacity: hover ? 1 :0}"
                  class="hoverable"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </template>
            </bs-display-book>
          </v-hover>
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
import GenericDisplayBook from "../bookviews/GenericDisplayBook";
import Preloader from "../shared/Preloader";

export default {
  components: {
    "bs-upload-dialog": BookUploadDialog,
    "bs-display-book": GenericDisplayBook,
    "bs-loader": Preloader
  },
  data() {
    return {
      dialogActive: false,
      loading: false,
      books: null
    };
  },
  methods: {
    remove() {}
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

<style scoped>
.hoverable {
  transition: opacity 0.5s ease-in;
}
</style>