<template>
  <v-tabs v-model="tab" grow>
    <v-tab v-for="item in tabItems" :key="item.name">
      <v-badge color="transparent">
        {{ item.name }}
        <sup>{{ item.books.length }}</sup>
      </v-badge>
    </v-tab>
    <v-tabs-items v-model="tab">
      <v-row justify="space-between" no-gutters>
        <v-col cols="auto">
          <v-card-title class="pa-2">{{ tabItems[tab].name }}</v-card-title>
        </v-col>
        <v-col cols="auto">
          <v-card-title class="pa-2 font-weight-regular">
            read {{ pagesRead(tab) }} pages
          </v-card-title>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-col v-for="(book, i) in getBooks(tab)" :key="book.id" class="py-0">
        <bs-horizontal-book :book="book" @error="handleError(event)"></bs-horizontal-book>
        <v-divider v-if="i < getBooks(tab).length - 1"></v-divider>
      </v-col>
      <v-divider v-if="getBooks(tab).length > 0"></v-divider>
      <v-row justify="end" v-if="showLink(tab)">
        <v-col class="pb-0" cols="auto" @click="showBooks = !showBooks">
          <a class="highlight">{{ showLinkText }}</a>
        </v-col>
      </v-row>
    </v-tabs-items>
  </v-tabs>
</template>

<script>
import HorizontalBook from "../bookviews/HorizontalBook";
export default {
  components: {
    "bs-horizontal-book": HorizontalBook,
  },
  props: {
    tabItems: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      tab: 0,
      showBooksNum: 10,
      showBooks: false,
    };
  },

  computed: {
    showLinkText() {
      return this.showBooks ? "Show less" : "Show more";
    },
  },

  methods: {
    showLink(tab) {
      return this.tabItems[tab].books.length > this.showBooksNum;
    },

    getBooks(tab) {
      let books = this.tabItems[tab].books;
      if (books.length > this.showBooksNum && !this.showBooks) {
        return books.slice(0, this.showBooksNum);
      } else {
        return books;
      }
    },

    pagesRead(tab) {
      return this.tabItems[tab].books.reduce(
        (prevValue, curValue) => prevValue + +curValue.userData.pagesRead,
        0
      );
    },

    getTabPos() {
      const pos = this.tabItems.findIndex((item) => item.books.length > 0);
      return pos > 0 ? pos : 0;
    },

    handleError(error) {
      this.$emit("error", error);
    },
  },

  mounted() {
    this.tab = this.getTabPos();
  },
};
</script>
