<template>
  <v-card>
    <v-card-title>To Read Page</v-card-title>
    <v-container>
      <v-layout column wrap>
        <my-book-toread
          v-for="item in 10"
          :key="item"
          :book="book"
        ></my-book-toread>
      </v-layout>
    </v-container>
  </v-card>
</template>
<script>
import BookToRead from "./bookviews/BookToRead";
export default {
  data() {
    return {
      book: {
        name: "My awesome book",
        author: "Some Writer Guy",
        imgUrl: "https://source.unsplash.com/random/200x250",
        anotation:
          "Following the Normandy Landings, a group of U.S. soldiers go behind enemy lines to retrieve a paratrooper whose brothers have been killed in action.",
        rating: 3.5
      }
    };
  },
  components: {
    "my-book-toread": BookToRead
  }
};
</script>
