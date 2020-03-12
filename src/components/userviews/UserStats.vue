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
          <v-card-text class="red--text headline"
            ><span class="display-3 font-weight-medium">
              {{ readBooks }}
            </span>
            books and
            <span class="display-3 font-weight-medium">{{ pagesRead }} </span
            >pages read</v-card-text
          >
          <v-card-text class="grey--text headline "
            ><span class="display-3 font-weight-medium">
              {{ booksLeft }}
            </span>
            books and
            <span class="display-3 font-weight-medium">{{ pagesLeft }} </span
            >pages left</v-card-text
          >
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
  components: {
    "bs-user-chart": UserGenreChart
  },
  async created() {
    const books = await userService.getAllUserBooks(this.user.token);
    const read = books.filter(book => book.userData.status === "finished");
    const pageCounter = (prevValue, curValue) => prevValue + +curValue.pages;
    this.readBooks = read.length;
    this.pagesRead = read.reduce(pageCounter, 0);
    const left = books.filter(
      book =>
        book.userData.status !== "finished" &&
        book.userData.status !== "stopped"
    );
    this.booksLeft = left.length;
    this.pagesLeft = left.reduce(pageCounter, 0);
  }
};
</script>
