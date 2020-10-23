<template>
  <v-container :class="!mdH ? 'px-5' : 'pa-0'">
    <v-row
      align="center"
      :justify="smL ? 'center' : 'start'"
      :style="wrapperStyle"
      :dense="smL"
    >
      <v-col cols="auto">
        <bs-img :url="book.imageUrl" width="80" height="120"></bs-img>
      </v-col>
      <v-col cols="auto" class="pa-1" style="width: 220px">
        <v-card-text class="pa-1 subtitle-1">
          <bs-book-links :id="book.id">{{ shrinkedDescription }}</bs-book-links>
        </v-card-text>
        <bs-author-links
          :authors="book.authors"
          :classes="'pa-1 subtitle-1'"
        ></bs-author-links>
      </v-col>
      <v-spacer v-if="mdH"></v-spacer>
      <v-col class="text-center" :cols="smL ? '12' : 'auto'">
        <v-rating
          medium
          v-model="book.userData.rating"
          hover
          @input="update"
        ></v-rating>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="auto" style="min-width: 260px">
        <v-row no-gutters>
          <div class="page-read">
            <div :style="pagesStyle">
              <div style="flex-grow: 1">Pages read</div>
              <div class="pl-2">{{ book.userData.pagesRead }}</div>
            </div>
            <div v-show="pagesProgress < 88">{{ book.pages }}</div>
          </div>
        </v-row>
        <v-progress-linear :value="pagesProgress"></v-progress-linear>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AuthorLinksHelper from "../author/AuthorLinksHelper";
import BookLinksHelper from "./BookLinkHelper";
import shrinkDesc from "../../mixins/shrinkDescription";
import mediaQuery from "../../mixins/mediaQueryLogic";
import { ServiceFactory } from "../../services/serviceFactory";
import PlaceholderImg from "../shared/PlaceholderImg.vue";
const userService = ServiceFactory.get("user");
export default {
  props: {
    book: {
      type: Object,
      required: true,
    },
  },
  mixins: [shrinkDesc, mediaQuery],
  components: {
    "bs-author-links": AuthorLinksHelper,
    "bs-book-links": BookLinksHelper,
    "bs-img": PlaceholderImg,
  },

  computed: {
    pagesProgress() {
      return (this.book.userData.pagesRead / this.book.pages) * 100;
    },

    pagesStyle() {
      return {
        flexBasis: this.pagesProgress > 50 ? `${this.pagesProgress}%` : "",
      };
    },

    wrapperStyle() {
      return {
        flexWrap: this.smL ? "wrap" : "nowrap",
      };
    },
  },

  methods: {
    update() {
      userService.updateBook(this.book).catch((error) => {
        console.log(error);
        this.$emit("error", error.body);
      });
    },
  },

  created() {
    this.generateDescription(this.book.title, 10, 10);
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
