<template>
  <v-card flat v-if="sery && books">
    <v-row>
      <v-col>
        <v-card-text class="subtitle-1 font-weight-medium py-0"
          ><router-link
            class="link-inherit highlight"
            :to="{ name: 'series', params: { id: sery.id } }"
          >
            {{ sery.title }} </router-link
          >({{ sery.workCount }} books)
        </v-card-text>
        <v-card-text class="pb-0 body-2">by {{ sery.author }}</v-card-text>
        <v-card-text class="py-1 body-2"
          >Average rating: {{ avgRating }}
        </v-card-text>
      </v-col>
      <v-col cols="auto">
        <v-row no-gutters justify="end">
          <v-col cols="auto" v-for="book in books" :key="book.id" class="pr-2">
            <v-img :src="book.imageUrl" width="60" height="100"></v-img>
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
      books: null,
      loading: true
    };
  },
  computed: {
    user() {
      return this.$store.getters.getAuthUser;
    },
    avgRating() {
      return (
        this.books.reduce(
          (prevValue, curValue) => prevValue + +curValue.goodreadsRating,
          0
        ) / this.books.length
      ).toFixed(2);
    }
  },
  props: {
    series: {
      required: true,
      type: Object
    }
  },
  mounted() {
    this.loading = true;
    seriesService
      .getSeriesById(this.series.id, this.user.token)
      .then(sery => {
        this.sery = sery;
        return Promise.all(
          this.sery.bookIds.map(id =>
            bookService.getBookById(id, this.user.token)
          )
        );
      })
      .then(books => {
        this.books = books;
        this.loading = false;
      })
      .catch(error => {
        console.log(error);
        this.loading = false;
      });
  }
};
</script>
