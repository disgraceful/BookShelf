<template>
  <v-card flat>
    <v-container
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
        <v-tabs v-model="tab" grow>
          <v-tab v-for="item in tabItems" :key="item.name">
            <v-badge color="deep-purple accent-4" icon="mdi-vuetify">
              {{ item.name }} <sup>{{ item.books.length }}</sup>
            </v-badge>
          </v-tab>
          <v-tabs-items v-model="tab" v-if="loading">
            <bs-book-list :books="tabItems[tab].books"></bs-book-list>
          </v-tabs-items>
        </v-tabs>
      </v-col>
    </v-container>
  </v-card>
</template>

<script>
import UserProgress from "../shared/UserProgress";
import UserBookList from "../bookviews/UserBookList";
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
        (prevValue, curValue) => prevValue + curValue.pagesRead,
        0
      );
    }
  },
  components: {
    "bs-progress": UserProgress,
    "bs-book-list": UserBookList
  },
  async created() {
    this.user = await userService.getUser(this.userState.token);
    this.userBooks = this.user.books;
    this.tabItems = [
      {
        name: "Reading",
        books: this.userBooks.filter(book => book.status === "reading")
      },
      {
        name: "2Read",
        books: this.userBooks.filter(book => book.status === "toread")
      },
      {
        name: "Stopped",
        books: this.userBooks.filter(book => book.status === "stopped")
      },
      {
        name: "Finished",
        books: this.userBooks.filter(book => book.status === "finished")
      }
    ];
    this.loading = true;
  }
};
</script>
