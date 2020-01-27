<template>
  <v-card flat>
    <v-row v-for="(book, i) in books" :key="book.id">
      <bs-smallbook :book="test">
        <v-divider v-if="i < books.length - 1"></v-divider>
      </bs-smallbook>
    </v-row>
  </v-card>
</template>

<script>
import SmallBook from "./SmallBook";
export default {
  data() {
    return {
      test: {
        smallImageUrl:
          "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1408303130l/375802._SY160_.jpg",
        title: "Immortal Guard",
        author: { name: "N. R. Kash" },
        pages: 556,
        rating: 4.5
      }
    };
  },
  props: ["books"],
  components: {
    "bs-smallbook": SmallBook
  },
  beforeUpdate() {
    console.log("prop: ", this.books);
  }
};
</script>
