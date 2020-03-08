<template>
  <v-card flat v-if="sery && books">
    <v-row>
      <v-col>
        <v-card-text class="subtitle-1 pt-0 pb-0"
          >{{ sery.title }} ({{ sery.workCount }} books)</v-card-text
        >
        <v-card-text>Average rating: {{ avgRating }} </v-card-text>
      </v-col>
      <v-col cols="auto">
        <v-row no-gutters justify="end">
          <v-col cols="auto" v-for="book in books" :key="book.id">
            <v-img :src="book.imageUrl" width="80" height="120" contain></v-img>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-divider></v-divider>
  </v-card>
</template>

<script>
import { ServiceFactory } from "../../services/serviceFactory";
const seriesService = ServiceFactory.get("series");
const bookService = ServiceFactory.get("book");
export default {
  data() {
    return {
      sery: null,
      books: null
    };
  },
  computed: {
    user() {
      return this.$store.getters.getAuthUser;
    },
    avgRating() {
      return (
        this.books.reduce((prevValue, curValue) => {
          return prevValue + +curValue.goodreadsRating;
        }, 0) / this.books.length
      ).toFixed(2);
    }
  },
  props: {
    series: {
      required: true,
      type: Object
    }
  },
  async mounted() {
    this.sery = await seriesService.getSeriesById(
      this.series.id,
      this.user.token
    );
    console.log(this.sery);
    this.books = await Promise.all(
      this.sery.bookIds.map(async id => {
        return await bookService.getBookById(id, this.user.token);
      })
    );
    console.log(this.books);
  }
};
</script>
