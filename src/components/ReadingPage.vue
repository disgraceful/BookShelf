<template>
  <v-card>
    <v-card-title>
      Reading Page
    </v-card-title>
    <v-container>
      <my-book-progress
        v-for="item in 10"
        :key="item"
        :book="book"
      ></my-book-progress>
    </v-container>
  </v-card>
</template>

<script>
import BookProgress from "./bookviews/BookProgress";
export default {
  data() {
    return {
      book: {
        name: "My awesome book",
        author: "Some Writer Guy",
        imgUrl: "https://source.unsplash.com/random/200x250",
        anotation:
          "Following the Normandy Landings, a group of U.S. soldiers go behind enemy lines to retrieve a paratrooper whose brothers have been killed in action.",
        rating: 3.5,
        progress: 25
      }
    };
  },
  components: {
    "my-book-progress": BookProgress
  }
};
</script>
