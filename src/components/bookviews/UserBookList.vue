<template>
  <v-card flat>
    <v-row v-for="book in books" :key="book.id">
      <bs-smallbook :book="test"></bs-smallbook>
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
          "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1408303130l/375802._SY75_.jpg",
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
  }
};
</script>
