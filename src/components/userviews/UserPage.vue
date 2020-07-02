<template>
  <v-card flat>
    <v-container v-if="user && tabItems">
      <v-card-title class="py-0">{{ user.email }}</v-card-title>
      <v-row :justify="$mq !== 'xs' ? 'start' : 'center'">
        <v-col cols="auto" class="pa-5">
          <bs-progress
            :progress="{
              value: tabItems[3].books.length,
              max: 20,
              text: 'Books',
              color: '#cc0000',
              bgcolor: '#ff9999'
            }"
          ></bs-progress>
        </v-col>
        <v-col cols="auto" class="pa-5">
          <bs-progress
            :progress="{
              value: pagesReadTotal,
              max: 5000,
              text: 'Pages',
              color: '#009878',
              bgcolor: '#99ffcc'
            }"
          ></bs-progress>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-col class="py-0">
        <bs-user-tabs v-if="$mq === 'md' || $mq === 'lg'" :tabItems="tabItems"></bs-user-tabs>
        <bs-user-panels v-else :tabItems="tabItems"></bs-user-panels>
      </v-col>
      <v-divider></v-divider>
    </v-container>

    <bs-loader
      v-if="loading"
      :options="{
        isDetermined: true,
        color: 'teal',
        size: '100',
        width: '10'
      }"
    ></bs-loader>
    <bs-loader v-if="loading"> </bs-loader>
  </v-card>
</template>

<script>
import Preloader from "../shared/Preloader";
import UserProgress from "./UserProgress";
import UserTabs from "./UserBookTabs";
import UserPanels from "./UserBookPanels";
import { ServiceFactory } from "../../services/serviceFactory";
const userService = ServiceFactory.get("user");
export default {
  data() {
    return {
      user: null,
      tab: 0,
      tabItems: null,
      loading: true,
      userBooks: null,
      countPages: (prevValue, curValue) =>
        prevValue + +curValue.userData.pagesRead
    };
  },
  props: ["id"],
  computed: {
    userState() {
      return this.$store.getters.getAuthUser;
    },
    globalLoading() {
      return this.$store.getters.loading;
    },
    pagesReadTotal() {
      return this.userBooks.reduce(this.countPages, 0);
    }
  },
  components: {
    "bs-user-tabs": UserTabs,
    "bs-user-panels": UserPanels,
    "bs-progress": UserProgress,
    "bs-loader": Preloader
  },
  methods: {},
  created() {
    this.loading = true;
    userService
      .getUser()
      .then(response => {
        this.user = response.body;
        this.userBooks = this.user.books;
        this.tabItems = [
          {
            name: "Reading",
            books: this.userBooks.filter(
              book => book.userData.status === "reading"
            )
          },
          {
            name: "2Read",
            books: this.userBooks.filter(
              book => book.userData.status === "2read"
            )
          },
          {
            name: "Stopped",
            books: this.userBooks.filter(
              book => book.userData.status === "stopped"
            )
          },
          {
            name: "Finished",
            books: this.userBooks.filter(
              book => book.userData.status === "finished"
            )
          }
        ];
        this.loading = false;
      })
      .catch(error => console.error(error));
  }
};
</script>
