<template>
  <v-card flat>
    <v-container
      ><v-card-title>{{ user.email }}</v-card-title>
      <v-col>
        <v-row>
          <bs-progress
            :progress="{
              value: 92,
              max: 200,
              text: 'Books',
              color: '#cc0000',
              bgcolor: '#ff9999'
            }"
          ></bs-progress>
          <bs-progress
            :progress="{
              value: 1960,
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
              {{ item.name }} <sup>4</sup>
            </v-badge>
          </v-tab>
          <v-tabs-items v-model="tab">
            <bs-book></bs-book>
          </v-tabs-items>
        </v-tabs>
      </v-col>
    </v-container>
  </v-card>
</template>

<script>
import UserProgress from "../shared/UserProgress";
import BookProgress from "../bookviews/BookProgress";
import { ServiceFactory } from "../../services/serviceFactory";
const userService = ServiceFactory.get("user");
export default {
  data() {
    return {
      user: {},
      tab: null,
      tabItems: [
        { name: "Reading", books: this.reading },
        { name: "2Read", books: this.toread },
        { name: "Stopped", books: this.stopped },
        { name: "Finished", books: this.finished }
      ],
      reading: [],
      toread: [],
      stopped: [],
      finished: []
    };
  },
  props: ["id"],
  components: {
    "bs-progress": UserProgress,
    "bs-book": BookProgress
  },
  async created() {
    this.user = await userService.getUser(this.id);
    this.reading = [];
    this.toread = [];
    this.stopped = [];
    this.finished = [];
  }
};
</script>
