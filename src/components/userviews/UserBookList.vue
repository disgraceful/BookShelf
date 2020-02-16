<template>
  <v-card flat>
    <v-row v-for="(book, i) in books" :key="book.id">
      <bs-smallbook :book="book">
        <v-divider v-if="i < books.length - 1"></v-divider>
      </bs-smallbook>
    </v-row>
  </v-card>
</template>

<script>
import SmallBook from "../bookviews/SmallBook";
export default {
  data() {
    return {};
  },
  props: ["books"],
  components: {
    "bs-smallbook": SmallBook
  }
};
</script>
