<template>
  <v-card flat>
    <v-container v-if="author && !error" class="page-container">
      <v-row :justify="xs ? 'center' : 'space-around'">
        <v-col
          :cols="$mq | mq({ xs: 'auto' })"
          style="max-width: 280px; min-width: 240px"
          class="pa-4"
        >
          <v-img :src="author.imageUrl"></v-img>
        </v-col>
        <v-col :cols="$mq | mq({ xs: 'auto', sm: '' })">
          <v-card-title class="text-h5 py-1">{{ author.name }}</v-card-title>
          <v-divider></v-divider>
          <v-card-text class="pb-0 text-body-1"
            >Born: {{ author.bornDate }}</v-card-text
          >
          <v-card-text class="py-1 text-body-1"
            >Died: {{ author.deathDate }}</v-card-text
          >
          <v-card-text class="pb-0 text-body-1 text-justify">
            {{ shrinkedDescription }}
            <a
              @click="shrinked = !shrinked"
              v-if="splitDescription.length > 90"
              >{{ expandLink }}</a
            >
          </v-card-text>
        </v-col>
      </v-row>
      <template v-if="books && !error">
        <v-row>
          <v-col>
            <v-card-title class="text-h6 font-weight-regular py-1"
              >{{ author.name }}'s Books</v-card-title
            >
            <v-divider></v-divider>
            <v-col v-for="(book, i) in books" :key="book.id" class="py-0">
              <bs-author-book :book="book"></bs-author-book>
              <v-divider v-if="i < books.length - 1"></v-divider>
            </v-col>
            <v-divider></v-divider>
          </v-col>
        </v-row>
        <v-row justify="end">
          <v-col cols="auto" class="pt-0">
            <a class="highlight teal--text text--darken-1"
              >More books by {{ author.name }}</a
            >
          </v-col>
        </v-row>
      </template>

      <template v-if="series && !error">
        <v-row v-if="series">
          <v-col>
            <v-card-title class="text-h6 font-weight-regular pb-1"
              >Series by {{ author.name }}</v-card-title
            >
            <v-divider></v-divider>
            <bs-author-series
              v-for="sery in series"
              :series="sery"
              :key="sery.id"
            ></bs-author-series>
          </v-col>
        </v-row>
        <v-row justify="end">
          <a class="pa-2 highlight teal--text text--darken-1"
            >More series by {{ author.name }}</a
          >
        </v-row>
      </template>
    </v-container>
    <bs-loader v-if="loading"></bs-loader>
  </v-card>
</template>

<script>
import AuthorBook from "../bookviews/AuthorBook";
import AuthorSeries from "../series/AuthorSeries";
import Loader from "../shared/Preloader";
import ErrorPage from "../shared/ErrorPage";
import shrinkDescription from "../../mixins/shrinkDescription";
import mediaQuery from "../../mixins/mediaQueryLogic";
import { ServiceFactory } from "../../services/serviceFactory";
const authorService = ServiceFactory.get("author");
const bookService = ServiceFactory.get("book");
const seriesService = ServiceFactory.get("series");

export default {
  mixins: [shrinkDescription, mediaQuery],
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  components: {
    "bs-author-book": AuthorBook,
    "bs-author-series": AuthorSeries,
    "bs-loader": Loader,
  },

  data() {
    return {
      author: null,
      books: null,
      loading: true,
      series: null,
      error: null,
    };
  },

  async created() {
    this.loading = true;
    const response = await authorService.getAuthorById(this.id);
    this.author = response.body;
    this.generateDescription(this.author.about, 60, 90);

    Promise.all(
      this.author.bookIds.slice(0, 6).map((id) => bookService.getBookById(id))
    ).then((response) => {
      this.books = response.map((res) => res.body);
    });

    authorService
      .getAuthorSeries(this.id)
      .then((response) => {
        return Promise.all(
          response.body
            .slice(0, 5)
            .map((series) => seriesService.getSeriesById(series.id))
        );
      })
      .then((response) => {
        this.series = response.map((res) => res.body);
        this.loading = false;
      })
      .catch((error) => {
        console.log(error);
        this.loading = false;
      });
  },
};
</script>
