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
        <v-card-text v-if="noBooks" class="text-h6 font-weight-regular"
          >Looks like you have no books in your library. Use search to find what
          you like!</v-card-text
        >
        <template v-else>
          <bs-user-tabs v-if="mdH" :tabItems="tabItems"></bs-user-tabs>
          <bs-user-panels v-else :tabItems="tabItems"></bs-user-panels>
        </template>
      </v-col>
    </v-container>
    <bs-loader v-if="loading"></bs-loader>
    <bs-error-page v-if="error"></bs-error-page>
  </v-card>
</template>

<script>
import Preloader from "../shared/Preloader";
import UserProgress from "./UserProgress";
import UserTabs from "./UserBookTabs";
import UserPanels from "./UserBookPanels";
import ErrorPage from "../shared/ErrorPage";
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
    "bs-error-page": ErrorPage,
  },

  data() {
    return {
      tab: 0,
      tabItems: null,
      loading: true,
      userBooks: null,
      countPages: (prevValue, curValue) =>
        prevValue + +curValue.userData.pagesRead,
      error: null,
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
            books: this.booksByStatus("reading"),
          },
          {
            name: "2Read",
            books: this.booksByStatus("2read"),
          },
          {
            name: "Stopped",
            books: this.booksByStatus("stopped"),
          },
          {
            name: "Finished",
            books: this.booksByStatus("finished"),
          },
        ];
        this.loading = false;
      })
      .catch((error) => {
        console.error(error);
        this.error = error;
      });
  },
};
</script>
