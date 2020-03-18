<template>
  <v-card flat>
    <v-container v-if="series" class="page-container">
      <v-card-title class="display-1 pb-1">{{ series.title }}</v-card-title>
      <v-card-text class="subtitle-1"
        >{{ series.workCount }} primary works | {{ series.allWorks }} total
        works</v-card-text
      >
      <v-divider></v-divider>
      <v-row v-if="books" justify="start">
        <v-col class="pa-0" cols="12" v-for="book in books" :key="book.id">
          <bs-series-book :book="book">
            <v-divider></v-divider>
          </bs-series-book>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import SeriesBook from "../bookviews/SeriesBook";
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
  computed: {
    user() {
      return this.$store.getters.getAuthUser;
    }
  },
  props: {
    id: {
      required: true,
      type: String
    }
  },
  components: {
    "bs-series-book": SeriesBook
  },
  async created() {
    try {
      this.series = await seriesService.getSeriesById(this.id, this.user.token);
      this.books = await Promise.all(
        this.series.bookIds.map(async id => {
          return await bookService.getBookById(id, this.user.token);
        })
      );
    } catch (error) {
      console.log(error);
    }
  }
};
</script>
