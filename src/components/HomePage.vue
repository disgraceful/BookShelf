<template>
  <v-card flat>
    <v-card-title>This is Home page</v-card-title>
    <v-container>
      <v-layout wrap justify-start>
        <my-book-standart
          v-for="item in 10"
          :key="item"
          :name="`BookName ${item}`"
          :author="`Author Name ${item}`"
          :imgUrl="mockUrl"
        >
        </my-book-standart>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import BookStandart from "./bookviews/BookStandart";
export default {
  data() {
    return {
      mockUrl: "https://source.unsplash.com/random/160x200"
    };
  },
  components: {
    "my-book-standart": BookStandart
  }
};
</script>
