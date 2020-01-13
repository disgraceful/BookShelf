<template>
  <v-card flat>
    <v-container>
      <v-row>
        <v-col cols="auto">
          <v-img :src="book.imageUrl" content></v-img>
          <v-rating v-model="rating"></v-rating>
          <div>My rating {{ rating > 0 ? rating : "" }}</div>
        </v-col>
        <v-col>
          <v-card-title class="pt-0 ">{{ book.title }}</v-card-title>
          <v-card-subtitle
            v-text="`(${book.seriesName} #${book.positionInSeries})`"
          ></v-card-subtitle>
          <v-card-text v-text="`by ${book.authorName}`"></v-card-text>
          <v-card-text>{{ book.description }}</v-card-text>
          <v-divider></v-divider>
          <v-card-text v-text="`Goodreads rating: ${book.goodreadsRating}`">
          </v-card-text>
          <v-card-text v-text="`Published in: ${book.publishedYear}`">
          </v-card-text>
          <v-card-text v-text="`Pages: ${book.pages}`"> </v-card-text>
          <v-toolbar flat dense>
            <v-toolbar-items>
              <template v-for="(item, index) in bookStatusButtons">
                <v-btn
                  text
                  :key="item.title"
                  :class="[item.active ? activeClass : '']"
                  >{{ item.title }}
                </v-btn>
                <v-divider
                  vertical
                  :key="index"
                  v-if="index < bookStatusButtons.length - 1"
                ></v-divider>
              </template>
            </v-toolbar-items>
          </v-toolbar>
        </v-col>
      </v-row>
    </v-container>
    <v-divider></v-divider>
  </v-card>
</template>

<script>
import { ServiceFactory } from "../../services/serviceFactory";
const bookService = ServiceFactory.get("book");
export default {
  data() {
    return {
      book: {},
      rating: 0,
      bookStatusButtons: [
        {
          title: "Reading",
          to: "",
          active: false
        },
        {
          title: "2Read",
          to: "",
          active: false
        },
        {
          title: "Stopped",
          to: "",
          active: false
        },
        {
          title: "Not Reading",
          to: "",
          active: true
        }
      ],
      activeClass: "active"
    };
  },
  props: ["id"],
  methods: {
    async getBookInfo() {
      this.book = await bookService.getBookById(this.id);
    }
  },
  created() {
    this.getBookInfo();
  }
};
</script>

<style scoped>
.active {
  background-color: teal;
  color: #fff;
}
</style>
