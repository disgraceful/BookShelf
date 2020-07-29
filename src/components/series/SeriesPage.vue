<template>
  <v-card flat>
    <v-container v-if="series" class="page-container">
      <v-card-title class="display-1 pb-1">{{ series.title }}</v-card-title>
      <v-card-text class="subtitle-1">
        {{ series.workCount }} primary works | {{ series.allWorks }} total
        works
      </v-card-text>
      <v-divider></v-divider>
      <v-row v-if="books" justify="start">
        <v-col class="pa-0" cols="12" v-for="book in books" :key="book.id">
          <bs-series-book :book="book">
            <v-divider></v-divider>
          </bs-series-book>
        </v-col>
      </v-row>
    </v-container>
    <bs-loader v-if="loading && !error"></bs-loader>
  </v-card>
</template>

<script>
import SeriesBook from "../bookviews/SeriesBook";
import Loader from "../shared/Preloader";
import { ServiceFactory } from "../../services/serviceFactory";
const seriesService = ServiceFactory.get("series");
const bookService = ServiceFactory.get("book");
export default {
  data() {
    return {
      series: null,
      error: null,
      loading: true,
      books: null
    };
  },
  props: {
    id: {
      required: true,
      type: String
    }
  },
  components: {
    "bs-series-book": SeriesBook,
    "bs-loader": Loader
  },
  async created() {
    try {
      this.loading = true;
      const response = await seriesService.getSeriesById(this.id);
      this.series = response.body;

      this.books = await Promise.all(
        this.series.bookIds.map(async id => {
          const response = await bookService.getBookById(id);
          return response.body;
        })
      );
      this.loading = false;
    } catch (error) {
      console.log(error);
      this.error = error.body;
    }
  }
};
</script>
