<template>
  <v-card flat>
    <v-container>
      <v-card-title class="headline">User Statistics</v-card-title>
      <v-row>
        <v-col cols="6">
          <div style="max-width:350px">
            <bs-user-chart></bs-user-chart>
          </div>
        </v-col>
        <v-col cols="6">
          <v-card-text class="red--text headline">
            <span class="display-3 font-weight-medium">{{ readBooks }}</span>
            books and
            <span class="display-3 font-weight-medium">{{ pagesRead }}</span>pages read
          </v-card-text>
          <v-card-text class="grey--text headline">
            <span class="display-3 font-weight-medium">{{ booksLeft }}</span>
            books and
            <span class="display-3 font-weight-medium">{{ pagesLeft }}</span>pages left
          </v-card-text>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import UserGenreChart from "./UserGenreChart";
import { ServiceFactory } from "../../services/serviceFactory";
const userService = ServiceFactory.get("user");
export default {
  components: {
    "bs-user-chart": UserGenreChart
  },
  data() {
    return {
      readBooks: 0,
      pagesRead: 0,
      booksLeft: 0,
      pagesLeft: 0
    };
  },
  computed: {
    user() {
      return this.$store.getters.getAuthUser;
    }
  },
  methods: {
    pageCounter(prevValue, curValue) {
      return prevValue + +curValue.pages;
    },
    pageLeftCounter(prevValue, curValue) {
      return prevValue + (+curValue.pages - curValue.userData.pagesRead);
    }
  },

  async created() {
    const response = await userService.getAllUserBooks();
    const books = response.body;
    const read = books.filter(book => book.userData.status === "finished");
    this.readBooks = read.length;
    this.pagesRead = read.reduce(this.pageCounter, 0);
    const left = books.filter(
      book =>
        book.userData.status !== "finished" &&
        book.userData.status !== "stopped"
    );
    this.booksLeft = left.length;
    this.pagesLeft = left.reduce(this.pageLeftCounter, 0);
  }
};
</script>
