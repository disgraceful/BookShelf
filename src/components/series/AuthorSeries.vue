<template>
  <v-card flat v-if="sery && books">
    <v-container class="py-0">
      <v-row>
        <v-col :class="$mq !== 'xs' ? '' : 'text-center'" style="min-width:150px">
          <v-card-text class="subtitle-1 font-weight-medium pa-0">
            <router-link
              class="link-inherit highlight"
              :to="{ name: 'series', params: { id: sery.id } }"
            >{{ sery.title }}</router-link>
            ({{ sery.workCount }} books)
          </v-card-text>
          <v-card-text class="pa-0 pt-2 body-2">by {{ sery.author }}</v-card-text>
          <v-card-text class="py-1 px-0 body-2">Average rating: {{ avgRating }}</v-card-text>
        </v-col>
        <v-col cols="auto">
          <v-row dense :justify="$mq === 'xs' ? 'start' : 'end'">
            <v-col cols="auto" v-for="book in books" :key="book.id" class="pr-2">
              <v-img :src="book.imageUrl" width="60" height="100"></v-img>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-divider></v-divider>
    </v-container>
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
  async created() {
    seriesService
      .getSeriesById(this.series.id)
      .then(response => {
        this.sery = response.body;
        return Promise.all(
          this.sery.bookIds.map(id => bookService.getBookById(id))
        );
      })
      .then(response => {
        this.books = response.map(res => res.body);
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>
