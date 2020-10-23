<template>
  <v-card flat>
    <v-row :dense="smL" class="fill-height" align="center">
      <v-col :class="!xs ? '' : 'text-center'" style="min-width: 250px">
        <v-card-text class="text-subtitle-1 font-weight-medium pa-0">
          <router-link
            class="link-inherit highlight"
            :to="{ name: 'series', params: { id: series.id } }"
            >{{ series.title }}</router-link
          >
          ({{ series.workCount }} books)
        </v-card-text>
        <v-card-text class="pa-0 pt-2 text-body-2"
          >by {{ series.author }}</v-card-text
        >
        <v-card-text v-if="books" class="py-1 px-0 text-body-2"
          >Average rating: {{ avgRating }}</v-card-text
        >
      </v-col>
      <v-col :cols="!smL ? 'auto' : '12'">
        <v-row dense :justify="smL ? 'center' : 'end'" v-if="books">
          <v-col cols="auto" v-for="book in books" :key="book.id">
            <router-link :to="{ name: 'book', params: { id: book.id } }">
              <bs-img :url="book.imageUrl"></bs-img>
            </router-link>
          </v-col>
        </v-row>
        <v-row v-if="loading && !error">
          <bs-loader
            :options="{ wrapperClass: '', size: 50, width: 5 }"
          ></bs-loader>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import Preloader from "../shared/Preloader";
import mediaQuery from "../../mixins/mediaQueryLogic";
import { ServiceFactory } from "../../services/serviceFactory";
import PlaceholderImg from "../shared/PlaceholderImg.vue";
const seriesService = ServiceFactory.get("series");
const bookService = ServiceFactory.get("book");

export default {
  mixins: [mediaQuery],
  props: {
    series: {
      required: true,
      type: Object,
    },
  },
  components: {
    "bs-loader": Preloader,
    "bs-img": PlaceholderImg,
  },

  data() {
    return {
      books: null,
      error: null,
      loading: true,
      displayBooks: 10,
    };
  },

  computed: {
    avgRating() {
      return (
        this.books.reduce(
          (prevValue, curValue) => prevValue + +curValue.goodreadsRating,
          0
        ) / this.books.length
      ).toFixed(2);
    },

    bookIndex() {
      return this.allBooksShown
        ? this.displayBooks
        : this.series.bookIds.length;
    },

    allBooksShown() {
      return this.series.bookIds.length > this.displayBooks;
    },
  },

  created() {
    this.loading = true;
    Promise.all(
      this.series.bookIds
        .slice(0, this.bookIndex)
        .map((id) => bookService.getBookById(id))
    )
      .then((response) => {
        this.books = response.map((res) => res.body);
        this.loading = false;
      })
      .catch((error) => {
        console.log(error);
        this.error = error.body;
        this.loading = false;
        this.$emit("error", this.error);
      });
  },
};
</script>
