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
          <v-card-text class="pb-0 body-1 text-justify"
            >{{ shrinkedDescription }}
            <a
              @click="shrinked = !shrinked"
              v-if="splitDescription.length > 90"
            >
              {{ expandLink }}</a
            ></v-card-text
          >
        </v-col>
      </v-row>
      <v-row v-if="books">
        <v-col>
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
      <v-row v-if="books" justify="end">
        <a class="pa-2 highlight teal--text text--darken-1"
          >More books by {{ author.name }}</a
        >
      </v-row>

      <v-row v-if="series">
        <v-col>
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
      <v-row v-if="series" justify="end">
        <a class="pa-2 highlight teal--text text--darken-1"
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
      series: null,
      splitDescription: "",
      shrinked: true
    };
  },
  computed: {
    user() {
      return this.$store.getters.getAuthUser;
    },
    expandLink() {
      return this.shrinked ? "...more" : "less";
    },
    isShrinked() {
      return this.splitDescription.length > 90;
    },
    shrinkedDescription() {
      if (this.shrinked && this.splitDescription.length > 90) {
        let shortDesc = this.splitDescription;
        return shortDesc.slice(0, 60).join(" ");
      } else {
        return this.author.about;
      }
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
      this.author.bookIds.slice(0, 6).map(async id => {
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
    this.splitDescription = this.author.about.split(" ");
  }
};
</script>
