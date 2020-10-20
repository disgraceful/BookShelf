<template>
  <v-card flat>
    <v-container v-if="bookIds && author && !error" class="page-container">
      <v-card-title class="text-h5 px-0 pb-1"
        >{{ author.name }}'s books</v-card-title
      >
      <v-divider></v-divider>
      <v-row justify="start">
        <v-col
          class="py-0"
          cols="12"
          v-for="bookId in visibleBooks"
          :key="bookId"
        >
          <bs-series-book :id="bookId" @error="error = $event"></bs-series-book>
        </v-col>
      </v-row>
      <v-row justify="end">
        <v-col cols="auto" class="pr-3">
          <a
            class="text-highlight teal--text"
            @click="showMoreBooks = !showMoreBooks"
            >{{ showLinkText }}</a
          >
        </v-col>
      </v-row>
    </v-container>
    <bs-loader v-if="loading && !error"></bs-loader>
    <bs-error-page v-if="error" :error="error"></bs-error-page>
  </v-card>
</template>

<script>
import Preloader from "../shared/Preloader";
import ErrorPage from "../shared/ErrorPage";
import SeriesBook from "../bookviews/SeriesBook";
import { ServiceFactory } from "../../services/serviceFactory";
const authorService = ServiceFactory.get("author");

export default {
  props: {
    id: String,
  },
  components: {
    "bs-loader": Preloader,
    "bs-error-page": ErrorPage,
    "bs-series-book": SeriesBook,
  },

  data() {
    return {
      author: null,
      bookIds: null,
      loading: true,
      error: null,
      showMoreBooks: false,
      showBooksNum: 10,
    };
  },

  computed: {
    visibleBooks() {
      return this.showMoreBooks
        ? this.bookIds
        : this.bookIds.slice(0, this.showBooksNum);
    },

    showLinkText() {
      return this.showMoreBooks ? "Show less" : "Show more";
    },
  },

  created() {
    this.loading = true;
    authorService
      .getAuthorBooks(this.id)
      .then((response) => {
        this.author = response.body.author;
        this.bookIds = response.body.bookIds;
        this.loading = false;
      })
      .catch((error) => {
        this.error = error.body;
        this.loading = false;
      });
  },
};
</script>