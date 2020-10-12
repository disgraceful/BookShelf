<template>
  <v-card flat>
    <v-container v-if="userBooks && tabItems">
      <v-card-title class="py-0">{{ user.email }}</v-card-title>
      <v-row :justify="xs ? 'start' : 'center'">
        <v-col cols="auto" class="pa-5">
          <bs-progress
            :progress="{
              value: tabItems[3].books.length,
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
      <v-col class="py-0">
        <bs-user-tabs
          v-if="mdH && tabItems"
          :tabItems="tabItems"
        ></bs-user-tabs>
        <bs-user-panels
          v-else-if="tabItems"
          :tabItems="tabItems"
        ></bs-user-panels>
      </v-col>
    </v-container>
    <bs-loader v-if="loading"></bs-loader>
  </v-card>
</template>

<script>
import Preloader from "../shared/Preloader";
import UserProgress from "./UserProgress";
import UserTabs from "./UserBookTabs";
import UserPanels from "./UserBookPanels";
import { ServiceFactory } from "../../services/serviceFactory";
import mediaQueryLogic from "../../mixins/mediaQueryLogic";
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
      countPages: (prevValue, curValue) =>
        prevValue + +curValue.userData.pagesRead,
    };
  },

  computed: {
    user() {
      return this.$store.getters.getAuthUser;
    },

    pagesReadTotal() {
      return this.userBooks.reduce(this.countPages, 0);
    },
  },

  created() {
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
            books: this.userBooks.filter(
              (book) => book.userData.status === "reading"
            ),
          },
          {
            name: "2Read",
            books: this.userBooks.filter(
              (book) => book.userData.status === "2read"
            ),
          },
          {
            name: "Stopped",
            books: this.userBooks.filter(
              (book) => book.userData.status === "stopped"
            ),
          },
          {
            name: "Finished",
            books: this.userBooks.filter(
              (book) => book.userData.status === "finished"
            ),
          },
        ];
        this.loading = false;
      })
      .catch((error) => console.error(error));
  },
};
</script>
