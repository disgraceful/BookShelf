<template>
  <v-card flat>
    <v-container v-if="tabItems && !error">
      <v-card-title class="py-0">{{ user.email }}</v-card-title>
      <v-row :justify="!xs ? 'start' : 'center'">
        <v-col cols="auto" class="pa-5">
          <bs-progress
            :progress="{
              value: booksByStatus('finished').length,
              max: 20,
              text: 'Books finished',
              color: '#cc0000',
              bgcolor: '#ff9999',
            }"
          ></bs-progress>
        </v-col>
        <v-col cols="auto" class="pa-5">
          <bs-progress
            :progress="{
              value: pagesReadTotal,
              max: 5000,
              text: 'Pages read',
              color: '#009878',
              bgcolor: '#99ffcc',
            }"
          ></bs-progress>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-col class="pa-0">
        <v-card-text v-if="noBooks" class="text-h6 font-weight-regular">
          Looks like you have no books in your library. Use search to find what you like!
        </v-card-text>
        <template v-else>
          <bs-user-tabs v-if="mdH" :tabItems="tabItems" @error="handleError($event)"></bs-user-tabs>
          <bs-user-panels v-else :tabItems="tabItems" @error="handleError($event)"></bs-user-panels>
        </template>
      </v-col>
    </v-container>
    <bs-loader v-if="loading && !error"></bs-loader>
  </v-card>
</template>

<script>
import Preloader from "../shared/Preloader";
import UserProgress from "./UserProgress";
import UserTabs from "./UserBookTabs";
import UserPanels from "./UserBookPanels";
import mediaQueryLogic from "../../mixins/mediaQueryLogic";
import { ServiceFactory } from "../../services/serviceFactory";
const userService = ServiceFactory.get("user");

export default {
  mixins: [mediaQueryLogic],
  props: ["id"],
  components: {
    "bs-user-tabs": UserTabs,
    "bs-user-panels": UserPanels,
    "bs-progress": UserProgress,
    "bs-loader": Preloader,
  },

  data() {
    return {
      tab: 0,
      tabItems: null,
      loading: true,
      userBooks: null,
      error: null,
      countPages: (prevValue, curValue) => prevValue + +curValue.userData.pagesRead,
    };
  },

  computed: {
    user() {
      return this.$store.getters.getAuthUser;
    },

    pagesReadTotal() {
      return this.userBooks.reduce(this.countPages, 0);
    },

    noBooks() {
      if (!this.userBooks) return false;
      return this.userBooks.length < 1;
    },
  },

  methods: {
    booksByStatus(status) {
      if (!this.userBooks) {
        return [];
      }
      return this.userBooks.filter((book) => book.userData.status === status);
    },

    readingSort(a, b) {
      let aRating = a.userData.rating;
      let bRating = b.userData.rating;
      let aPages = a.userData.pagesRead;
      let bPages = b.userData.pagesRead;

      if (aRating == bRating) {
        return aPages < bPages ? 1 : aPages > bPages ? -1 : 0;
      } else {
        return aRating < bRating ? 1 : -1;
      }
    },

    finishedSort(a, b) {
      let aReadingHistory = a.userData.finishTimes;
      let aDate = aReadingHistory[aReadingHistory.length - 1].endDate;
      let bReadingHistory = b.userData.finishTimes;
      let bDate = bReadingHistory[bReadingHistory.length - 1].endDate;
      return aDate < bDate ? 1 : -1;
    },

    handleError(event) {
      this.error = event;
      this.$emit("error", this.error);
    },
  },

  created() {
    this.error = null;
    this.loading = true;
    this.tabItems = null;
    this.userBooks = null;
    userService
      .getAllUserBooks()
      .then((response) => {
        this.userBooks = response.body;
        this.tabItems = [
          {
            name: "Reading",
            books: this.booksByStatus("reading").sort(this.readingSort),
          },
          {
            name: "2Read",
            books: this.booksByStatus("2read"),
          },
          {
            name: "Stopped",
            books: this.booksByStatus("stopped").sort(this.readingSort),
          },
          {
            name: "Finished",
            books: this.booksByStatus("finished").sort(this.finishedSort),
          },
        ];
        this.loading = false;
      })
      .catch((error) => {
        console.error(error);
        this.error = error.body;
        this.$emit("error", this.error);
        this.loading = false;
      });
  },
};
</script>
