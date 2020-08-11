<template>
  <v-card flat>
    <v-container v-if="books" class="page-container">
      <v-card-title class="headline py-2">Uploaded Books</v-card-title>
      <v-row>
        <v-col cols="auto" class="px-1" v-for="book in books" :key="book.id">
          <v-hover v-slot:default="{hover}">
            <bs-display-book :book="book" :params="{id: book.fid}">
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
      <bs-upload-dialog @uploaded="closeDialog()"></bs-upload-dialog>
    </v-dialog>
  </v-card>
</template>

<script>
import BookUploadDialog from "../bookviews/BookUploadDialog.vue";
import GenericDisplayBook from "../bookviews/GenericDisplayBook";
import Preloader from "../shared/Preloader";
import uploadService from "../../services/uploadService";

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
    remove() {},

    async closeDialog() {
      this.dialogActive = false;
      await this.getPrivateBooks();
    },

    async getPrivateBooks() {
      this.books = null;
      this.loading = true;
      const response = await uploadService.getPrivateBooks();
      this.books = response.body;
      console.log(this.books);
      this.loading = false;
    }
  },

  async created() {
    await this.getPrivateBooks();
  }
};
</script>

<style scoped>
.hoverable {
  transition: opacity 0.5s ease-in;
}
</style>