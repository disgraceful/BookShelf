<template>
  <v-card flat>
    <v-container v-if="!loading && !error">
      <v-card-title class="text-h5 py-2">User Statistics</v-card-title>
      <v-divider></v-divider>
      <v-card-text v-if="noBooks" class="text-h6 font-weight-regular">
        Looks like you have no books in your library! Your stats will show up when you start adding
        more books!
      </v-card-text>
      <v-row :justify="mdH ? 'center' : 'start'" v-else>
        <v-col :cols="mdH ? 'auto' : 12">
          <div style="max-width: 350px">
            <bs-genre-chart
              v-if="chartData"
              :chart-data="chartData"
              :options="chartOptions"
            ></bs-genre-chart>
          </div>
        </v-col>
        <v-col :cols="mdH ? 6 : 12">
          <v-card-text class="red--text headline">
            <span class="display-3 font-weight-medium">{{ readBooks.length }}</span>
            books and
            <span class="display-3 font-weight-medium">{{ pagesRead }}</span>
            pages read
          </v-card-text>
          <v-card-text class="grey--text headline">
            <span class="display-3 font-weight-medium">{{ booksLeft.length }}</span>
            books and
            <span class="display-3 font-weight-medium">{{ pagesLeft }}</span>
            pages left
          </v-card-text>
        </v-col>
      </v-row>
    </v-container>
    <bs-loader v-if="loading && !error"></bs-loader>
    <bs-error-page v-if="error" :error="error"></bs-error-page>
  </v-card>
</template>

<script>
import PieChart from "../shared/PieChart";
import Loader from "../shared/Preloader";
import { ServiceFactory } from "../../services/serviceFactory";
const userService = ServiceFactory.get("user");
import mediaQuery from "../../mixins/mediaQueryLogic";
import genresForChart from "../../mixins/genresForChart";
import ErrorPage from "../shared/ErrorPage";

export default {
  mixins: [mediaQuery, genresForChart],
  components: {
    "bs-genre-chart": PieChart,
    "bs-loader": Loader,
    "bs-error-page": ErrorPage,
  },

  data() {
    return {
      chartData: null,
      chartOptions: null,
      books: null,
      loading: false,
      error: null,
    };
  },

  computed: {
    noBooks() {
      if (!this.books) return false;
      return this.books.length < 1;
    },

    readBooks() {
      if (!this.books) return [];
      return this.books.filter((book) => book.userData.status === "finished");
    },

    pagesRead() {
      if (!this.books) return 0;
      return this.readBooks.reduce(this.pageCounter, 0);
    },

    booksLeft() {
      if (!this.books) return [];
      return this.books.filter(
        (book) => book.userData.status !== "finished" && book.userData.status !== "stopped"
      );
    },

    pagesLeft() {
      if (!this.books) return 0;
      return this.booksLeft.reduce(this.pageLeftCounter, 0);
    },
  },

  methods: {
    pageCounter(prevValue, curValue) {
      return prevValue + +curValue.pages;
    },

    pageLeftCounter(prevValue, curValue) {
      return prevValue + (+curValue.pages - curValue.userData.pagesRead);
    },
  },

  created() {
    this.loading = true;
    this.getChartData()
      .then((chart) => {
        this.chartData = chart.chartData;
        this.chartOptions = chart.options;
        return userService.getAllUserBooks();
      })
      .then((response) => {
        this.books = response.body;
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
