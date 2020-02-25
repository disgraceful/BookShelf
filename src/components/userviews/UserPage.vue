<template>
  <v-card flat>
    <v-container v-if="!loading"
      ><v-card-title>{{ user.email }}</v-card-title>
      <v-col>
        <v-row>
          <bs-progress
            :progress="{
              value: tabItems[3].books.length,
              max: 20,
              text: 'Books',
              color: '#cc0000',
              bgcolor: '#ff9999'
            }"
          ></bs-progress>
          <bs-progress
            :progress="{
              value: pagesReadTotal,
              max: 5000,
              text: 'Pages',
              color: '#009878',
              bgcolor: '#99ffcc'
            }"
          ></bs-progress>
        </v-row>
      </v-col>
      <v-divider></v-divider>
      <v-col>
        <v-tabs v-model="tab" grow background-color="#fafafa">
          <v-tab v-for="item in tabItems" :key="item.name">
            <v-badge color="deep-purple accent-4" icon="mdi-vuetify">
              {{ item.name }} <sup>{{ item.books.length }}</sup>
            </v-badge>
          </v-tab>
          <v-tabs-items v-model="tab">
            <bs-book-list :books="tabItems[tab].books"></bs-book-list>
          </v-tabs-items>
        </v-tabs>
      </v-col>
    </v-container>
    <bs-loader
      v-else
      :options="{
        isDetermined: true,
        color: 'teal',
        size: '100',
        width: '10'
      }"
    >
    </bs-loader>
  </v-card>
</template>

<script>
import Preloader from "../shared/Preloader";
import UserProgress from "../shared/UserProgress";
import UserBookList from "./UserBookList";
import { ServiceFactory } from "../../services/serviceFactory";
const userService = ServiceFactory.get("user");
export default {
  data() {
    return {
      user: {},
      tab: 0,
      tabItems: [],
      loading: false,
      userBooks: null
    };
  },
  props: ["id"],
  computed: {
    userState() {
      return this.$store.getters.getAuthUser;
    },
    pagesReadTotal() {
      return this.userBooks.reduce(
        (prevValue, curValue) => prevValue + +curValue.userData.pagesRead,
        0
      );
    }
  },
  components: {
    "bs-progress": UserProgress,
    "bs-book-list": UserBookList,
    "bs-loader": Preloader
  },
  async created() {
    this.loading = true;
    this.user = await userService.getUser(this.userState.token);
    this.userBooks = this.user.books;

    this.tabItems = [
      {
        name: "Reading",
        books: this.userBooks.filter(book => book.userData.status === "reading")
      },
      {
        name: "2Read",
        books: this.userBooks.filter(book => book.userData.status === "toread")
      },
      {
        name: "Stopped",
        books: this.userBooks.filter(book => book.userData.status === "stopped")
      },
      {
        name: "Finished",
        books: this.userBooks.filter(
          book => book.userData.status === "finished"
        )
      }
    ];
    this.loading = false;
  }
};
</script>
