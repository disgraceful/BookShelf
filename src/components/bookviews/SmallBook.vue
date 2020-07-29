<template>
  <v-container class="py-0">
    <v-row align="center" :justify="$mq !== 'lg' && $mq !== 'md' ? 'center' : 'space-between'">
      <v-col cols="auto">
        <v-img :src="book.imageUrl" height="120" width="80"></v-img>
      </v-col>
      <v-col cols="auto">
        <v-card-text class="pa-1 subtitle-1">
          <router-link
            :to="{ name: 'book', params: { id: book.id } }"
            class="link-inherit highlight"
          >{{ book.title }}</router-link>
        </v-card-text>
        <v-card-text class="pa-1">
          by
          <router-link
            class="link-inherit highlight"
            v-for="(author, i) in book.authors"
            :key="i"
            :to="{ name: 'authors', params: { id: author.id } }"
            v-text="
              i < book.authors.length - 1 ? `${author.name}, ` : author.name
            "
          ></router-link>
        </v-card-text>
      </v-col>
      <v-col class="text-center">
        <v-rating medium v-model="book.userData.rating" hover @input="update"></v-rating>
      </v-col>
      <v-col cols="4">
        <v-row no-gutters style="min-width:250px">
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
import bookLogic from "../../mixins/bookLogic";
export default {
  props: {
    book: {
      type: Object,
      required: true
    }
  },
  mixins: [bookLogic],
  computed: {
    pagesProgress() {
      return (this.book.userData.pagesRead / this.book.pages) * 100;
    },
    pagesStyle() {
      return {
        flexBasis: this.pagesProgress > 35 ? `${this.pagesProgress}%` : ""
      };
    }
  },
  methods: {
    update() {
      this.updateBook();
    }
  }
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
