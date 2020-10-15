<template>
  <v-card flat>
    <v-container v-if="books && !error">
      <v-card-title class="text-h5 py-2">Uploaded Books</v-card-title>
      <v-divider></v-divider>
      <v-card-text v-if="noBooks" class="text-h6 font-weight-regular"
        >Looks like you haven't uploaded any books yet. Click upload
        button!</v-card-text
      >
      <v-row v-else :justify="xs ? 'center' : 'start'" class="px-2">
        <v-col
          cols="auto"
          class="px-1 py-0"
          v-for="(book, i) in books"
          :key="book.id"
        >
          <v-hover v-slot:default="{ hover }">
            <bs-display-book :book="book">
              <template v-slot:actions>
                <v-btn
                  fab
                  small
                  absolute
                  top
                  right
                  color="white"
                  @click="remove(book.id, book.imageUrl, i)"
                  :loading="loading && bookIndex == i"
                  :style="{ opacity: hover ? 1 : 0 }"
                  class="hoverable"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </template>
            </bs-display-book>
          </v-hover>
        </v-col>
      </v-row>
      <v-divider v-if="!noBooks"></v-divider>
      <v-col cols="auto">
        <v-btn @click.stop="dialogActive = true">Upload</v-btn>
      </v-col>
    </v-container>
    <v-dialog v-model="dialogActive" max-width="700">
      <bs-upload-dialog
        @uploaded="closeDialog()"
        @error="handleError(event)"
      ></bs-upload-dialog>
    </v-dialog>
    <bs-loader v-if="loading && bookIndex < 0"></bs-loader>
    <bs-error-page v-if="error" :error="error"></bs-error-page>
  </v-card>
</template>

<script>
import BookUploadDialog from "../bookviews/BookUploadDialog.vue";
import GenericDisplayBook from "../bookviews/GenericDisplayBook";
import Preloader from "../shared/Preloader";
import ErrorPage from "../shared/ErrorPage";
import { ServiceFactory } from "../../services/serviceFactory";
import mediaQuery from "../../mixins/mediaQueryLogic";
const uploadService = ServiceFactory.get("upload");

export default {
  mixins: [mediaQuery],
  components: {
    "bs-upload-dialog": BookUploadDialog,
    "bs-display-book": GenericDisplayBook,
    "bs-loader": Preloader,
    "bs-error-page": ErrorPage,
  },

  data() {
    return {
      books: null,
      dialogActive: false,
      loading: false,
      error: null,
      bookIndex: -1,
    };
  },

  computed: {
    noBooks() {
      return this.books ? this.books.length <= 0 : true;
    },
  },

  methods: {
    remove(id, url, index) {
      this.loading = true;
      this.bookIndex = index;
      uploadService
        .removePrivateBook(id, url)
        .then((response) => {
          let res = response.body;
          if (res) {
            this.books = this.books.filter((book) => book.id !== id);
          }
          this.loading = false;
          this.bookIndex = -1;
        })
        .catch((error) => {
          this.error = error.body;
          this.loading = false;
          this.bookIndex = -1;
        });
    },

    async closeDialog() {
      this.dialogActive = false;
      await this.getPrivateBooks();
    },

    getPrivateBooks() {
      this.books = null;
      this.loading = true;
      uploadService
        .getPrivateBooks()
        .then((response) => {
          this.books = response.body;
          this.loading = false;
        })
        .catch((error) => {
          this.error = error;
          this.loading = false;
        });
    },

    handleError(event) {
      this.loading = false;
      this.error = event;
    },
  },

  async created() {
    await this.getPrivateBooks();
  },
};
</script>

<style scoped>
.hoverable {
  transition: opacity 0.5s ease-in;
}
</style>