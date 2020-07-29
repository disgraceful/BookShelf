<template>
  <v-card flat>
    <v-container v-if="author" class="page-container">
      <v-row :justify="$mq === 'xs' ? 'center' : 'space-around'">
        <v-col
          :cols="$mq | mq({ xs: 'auto' })"
          style="max-width: 280px; min-width:240px;"
          class="pa-4"
        >
          <v-img :src="author.imageUrl"></v-img>
        </v-col>
        <v-col :cols="$mq | mq({ xs: 'auto', sm: '' })">
          <v-card-title class="headline">{{ author.name }}</v-card-title>
          <v-divider></v-divider>
          <v-card-text class="pb-0 body-1">Born: {{ author.bornDate }}</v-card-text>
          <v-card-text class="pb-0 body-1">Died: {{ author.deathDate }}</v-card-text>
          <v-card-text class="pb-0 body-1 text-justify">
            {{ shrinkedDescription }}
            <a
              @click="shrinked = !shrinked"
              v-if="splitDescription.length > 90"
            >{{ expandLink }}</a>
          </v-card-text>
        </v-col>
      </v-row>
      <template v-if="books">
        <v-row>
          <v-col>
            <v-card-title class="title font-weight-regular pb-1">{{ author.name }}'s Books</v-card-title>
            <v-divider></v-divider>
            <bs-author-book v-for="book in books" :book="book" :key="book.id"></bs-author-book>
          </v-col>
        </v-row>
        <v-row justify="end">
          <a class="pa-2 highlight teal--text text--darken-1">More books by {{ author.name }}</a>
        </v-row>
      </template>

      <template v-if="series">
        <v-row v-if="series">
          <v-col>
            <v-card-title class="title font-weight-regular pb-1">Series by {{ author.name }}</v-card-title>
            <v-divider></v-divider>
            <bs-author-series v-for="sery in series" :series="sery" :key="sery.id"></bs-author-series>
          </v-col>
        </v-row>
        <v-row justify="end">
          <a class="pa-2 highlight teal--text text--darken-1">More series by {{ author.name }}</a>
        </v-row>
      </template>
    </v-container>
    <bs-loader v-if="loading"></bs-loader>
  </v-card>
</template>

<script>
import AuthorBook from "../bookviews/AuthorBook";
import AuthorSeries from "../series/AuthorSeries";
import shrinkDescription from "../../mixins/shrinkDescription";
import Loader from "../shared/Preloader";

import { ServiceFactory } from "../../services/serviceFactory";
const authorService = ServiceFactory.get("author");
const bookService = ServiceFactory.get("book");
const seriesService = ServiceFactory.get("series");

export default {
  mixins: [shrinkDescription],
  props: {
    id: {
      required: true,
      type: String
    }
  },
  components: {
    "bs-author-book": AuthorBook,
    "bs-author-series": AuthorSeries,
    "bs-loader": Loader
  },
  data() {
    return {
      author: null,
      books: null,
      loading: true,
      series: null
    };
  },
  async created() {
    this.loading = true;
    const response = await authorService.getAuthorById(this.id);
    this.author = response.body;
    this.generateDescription(this.author.about, 60, 90);

    Promise.all(
      this.author.bookIds.slice(0, 6).map(id => bookService.getBookById(id))
    ).then(response => {
      this.books = response.map(res => res.body);
    });

    authorService
      .getAuthorSeries(this.id)
      .then(response => {
        return Promise.all(
          response.body
            .slice(0, 5)
            .map(series => seriesService.getSeriesById(series.id))
        );
      })
      .then(response => {
        this.series = response.map(res => res.body);
        this.loading = false;
      })
      .catch(error => {
        console.log(error);
        this.loading = false;
      });
  }
};
</script>
