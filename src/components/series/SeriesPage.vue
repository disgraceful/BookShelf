<template>
  <v-card flat>
    <v-container v-if="series && !error" class="page-container">
      <v-card-title class="text-h5 px-0 pb-1">{{ series.title }}</v-card-title>
      <v-card-text class="text-subtitle-1 px-0 pb-2">
        {{ series.workCount }} primary works | {{ series.allWorks }} total works
      </v-card-text>
      <v-divider></v-divider>
      <v-row justify="start">
        <v-col class="py-0" cols="12" v-for="bookId in books" :key="bookId">
          <bs-series-book :id="bookId" @error="error = $event"></bs-series-book>
        </v-col>
      </v-row>
      <v-row justify="end">
        <v-col cols="auto" class="pr-3">
          <a class="text-highlight teal--text" @click="showBooks = !showBooks">
            {{ showLinkText }}
          </a>
        </v-col>
      </v-row>
    </v-container>
    <bs-loader v-if="loading && !error"></bs-loader>
    <bs-error-page v-if="error" :error="error"></bs-error-page>
  </v-card>
</template>

<script>
import SeriesBook from "../bookviews/SeriesBook";
import Loader from "../shared/Preloader";
import ErrorPage from "../shared/ErrorPage.vue";
import mediaQueryLogic from "../../mixins/mediaQueryLogic";
import { ServiceFactory } from "../../services/serviceFactory";
const seriesService = ServiceFactory.get("series");
const bookService = ServiceFactory.get("book");

export default {
  mixins: [mediaQueryLogic],
  props: {
    id: {
      required: true,
      type: String,
    },
  },
  components: {
    "bs-series-book": SeriesBook,
    "bs-loader": Loader,
    "bs-error-page": ErrorPage,
  },

  data() {
    return {
      series: null,
      error: null,
      loading: true,
      showBooksNum: 10,
      showBooks: false,
    };
  },

  computed: {
    books() {
      return this.showBooks ? this.series.bookIds : this.series.bookIds.slice(0, this.showBooksNum);
    },

    showLinkText() {
      if (this.series.bookIds.length <= this.showBooksNum) return "";
      return this.showBooks ? "Hide" : "Show all";
    },
  },

  created() {
    this.loading = true;
    seriesService
      .getSeriesById(this.id)
      .then((response) => {
        this.series = response.body;
        this.loading = false;
      })
      .catch((error) => {
        console.log(error);
        this.error = error.body;
        this.loading = false;
      });
  },
};
</script>
