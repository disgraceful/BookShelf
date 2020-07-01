<template>
  <v-tabs v-model="tab" grow>
    <v-tab v-for="item in tabItems" :key="item.name">
      <v-badge color="transparent">
        {{ item.name }}
        <sup>{{item.books.length}}</sup>
      </v-badge>
    </v-tab>
    <v-tabs-items v-model="tab">
      <v-row justify="space-between" no-gutters>
        <v-col cols="auto">
          <v-card-title class="pa-2">{{ tabItems[tab].name }}</v-card-title>
        </v-col>
        <v-col cols="auto">
          <v-card-title class="pa-2 font-weight-regular">read {{ pagesRead(tab) }} pages</v-card-title>
        </v-col>
      </v-row>
      <v-divider v-if="getBooks(tab).length > 0"></v-divider>
      <v-row v-for="(book, i) in getBooks(tab)" :key="book.id">
        <bs-smallbook :book="book">
          <v-divider v-if="i - 1 < getBooks(tab).length"></v-divider>
        </bs-smallbook>
      </v-row>
    </v-tabs-items>
  </v-tabs>
</template>

<script>
import SmallBook from "../bookviews/SmallBook";
export default {
  data() {
    return {
      tab: 0
    };
  },
  props: {
    tabItems: {
      type: Array,
      required: true
    }
  },
  components: {
    "bs-smallbook": SmallBook
  },
  methods: {
    getBooks(tab) {
      return this.tabItems[tab].books;
    },
    pagesRead(tab) {
      return this.tabItems[tab].books.reduce(
        (prevValue, curValue) => prevValue + +curValue.userData.pagesRead,
        0
      );
    },
    getTabPos() {
      return this.tabItems.findIndex(item => item.books.length > 0);
    }
  },
  mounted() {
    this.tab = this.getTabPos();
  }
};
</script>
