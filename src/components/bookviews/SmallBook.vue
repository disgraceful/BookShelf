<template>
  <v-container class="py-0">
    <v-row align="center">
      <v-col cols="auto">
        <v-img :src="book.imageUrl" height="120" width="80"></v-img>
      </v-col>
      <v-col cols="auto" style="max-width:200px">
        <v-card-text class="pa-1 subtitle-1">
          <router-link
            :to="{ name: 'book', params: { id: book.id } }"
            class="link-inherit highlight"
          >{{ book.title }}</router-link>
        </v-card-text>
        <bs-author-links :authors="book.authors" :classes="'pa-1 subtitle-1'"></bs-author-links>
      </v-col>
      <v-spacer></v-spacer>
      <v-col class="text-center" cols="auto">
        <v-rating medium v-model="book.userData.rating" hover @input="update"></v-rating>
      </v-col>
      <v-spacer></v-spacer>
      <v-col>
        <v-row no-gutters style="min-width:300px">
          <div class="page-read">
            <div :style="pagesStyle">
              <div style="flex-grow:1">Pages read</div>
              <div class="pl-2">{{book.userData.pagesRead}}</div>
            </div>
            <div v-show="pagesProgress<88">{{book.pages}}</div>
          </div>
        </v-row>
        <v-progress-linear :value="pagesProgress"></v-progress-linear>
      </v-col>
    </v-row>
    <slot></slot>
  </v-container>
</template>

<script>
import AuthorLinksHelper from "../author/AuthorLinksHelper";
import bookLogic from "../../mixins/bookLogic";
export default {
  props: {
    book: {
      type: Object,
      required: true,
    },
  },
  mixins: [bookLogic],
  components: { "bs-author-links": AuthorLinksHelper },
  computed: {
    pagesProgress() {
      return (this.book.userData.pagesRead / this.book.pages) * 100;
    },
    pagesStyle() {
      return {
        flexBasis: this.pagesProgress > 35 ? `${this.pagesProgress}%` : "",
      };
    },
  },
  methods: {
    update() {
      this.updateBook();
    },
  },
};
</script>

<style scoped>
.page-read {
  display: flex;
  flex-direction: row;
  flex: 1 0;
}

.page-read div {
  display: flex;
}

.page-read > div:last-child {
  justify-content: flex-end;
  flex: 1 0;
}
</style>
