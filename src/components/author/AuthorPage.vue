<template>
  <v-card flat>
    <v-container v-if="author">
      <v-row>
        <v-col cols="4" md="3" class="pa-4">
          <v-img :src="author.imageUrl"></v-img>
        </v-col>
        <v-col>
          <v-card-title class="headline"> {{ author.name }}</v-card-title>
          <v-divider></v-divider>
          <v-card-text class="pb-0 body-1"
            >Born: {{ author.bornDate }}</v-card-text
          >
          <v-card-text class="pb-0 body-1"
            >Died: {{ author.deathDate }}</v-card-text
          >
          <v-card-text class="pb-0 body-1">{{ author.about }}</v-card-text>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-if="books">
          <v-card-title class="title font-weight-regular pb-1"
            >{{ author.name }}'s Books</v-card-title
          >
          <v-divider></v-divider>
          <bs-author-book
            v-for="book in books"
            :book="book"
            :key="book.id"
          ></bs-author-book>
        </v-col>
      </v-row>
      <v-row justify="end">
        <a class="pa-2 link-inherit highlight"
          >More books by {{ author.name }}</a
        >
      </v-row>
      <v-row>
        <v-col v-if="series">
          <v-card-title class="title font-weight-regular pb-1"
            >Series by {{ author.name }}</v-card-title
          >
          <v-divider></v-divider>
          <bs-author-series
            v-for="sery in series"
            :series="sery"
            :key="sery.id"
          >
          </bs-author-series>
        </v-col>
      </v-row>
      <v-row justify="end">
        <a class="pa-2 link-inherit highlight"
          >More series by {{ author.name }}</a
        >
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { ServiceFactory } from "../../services/serviceFactory";
const authorService = ServiceFactory.get("author");
const bookService = ServiceFactory.get("book");
const seriesService = ServiceFactory.get("series");
import AuthorBook from "../bookviews/AuthorBook";
import AuthorSeries from "../series/AuthorSeries";

export default {
  data() {
    return {
      author: null,
      books: null,
      loading: true,
      series: null
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
    "bs-author-book": AuthorBook,
    "bs-author-series": AuthorSeries
  },
  async created() {
    this.author = await authorService.getAuthorById(this.id, this.user.token);
    this.books = await Promise.all(
      this.author.books.map(async id => {
        return await bookService.getBookById(id, this.user.token);
      })
    );
    const authSeries = await authorService.getAuthorSeries(
      this.id,
      this.user.token
    );
    this.series = await Promise.all(
      authSeries.slice(0, 5).map(async item => {
        return await seriesService.getSeriesById(item.id, this.user.token);
      })
    );
  }
};
</script>
