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
        <v-col>
          <v-card-title>{{ author.name }}'s Books</v-card-title>
          <v-divider></v-divider>
          <bs-author-book
            :book="book"
            v-for="book in books"
            :key="book.id"
          ></bs-author-book>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { ServiceFactory } from "../../services/serviceFactory";
const authorService = ServiceFactory.get("author");
const bookService = ServiceFactory.get("book");
import AuthorBook from "../bookviews/AuthorBook";
export default {
  data() {
    return {
      author: null,
      books: null,
      loading: true
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
  components: { "bs-author-book": AuthorBook },
  async created() {
    this.author = await authorService.getAuthorById(this.id, this.user.token);
    this.books = await Promise.all(
      this.author.books.map(async id => {
        return await bookService.getBookById(id, this.user.token);
      })
    );
    console.log(this.books);
  }
};
</script>
