<template>
  <div>
    <v-card-title class="py-2 text-h5 font-weight-medium">
      {{ book.title }}
    </v-card-title>
    <v-card-subtitle v-if="book.series" class="text-h6 py-2">
      <router-link
        class="link-inherit highlight"
        :to="{ name: 'series', params: { id: book.series.id } }"
        >{{ book.series.fullName }}</router-link
      >
    </v-card-subtitle>
    <bs-author-links
      :authors="book.authors"
      classes="pb-0 text-subtitle-1"
    ></bs-author-links>
    <v-card-text
      v-if="book.goodreadsRating"
      class="py-0 text-subtitle-1"
      v-text="`Goodreads rating: ${book.goodreadsRating}`"
    ></v-card-text>
    <v-card-text
      v-if="book.publishedYear"
      class="pb-0 pt-1 text-subtitle-1"
      v-text="`Published in: ${book.publishedYear}`"
    ></v-card-text>
    <v-card-text
      class="pb-0 pt-1 text-subtitle-1"
      v-text="`Pages: ${book.pages}`"
    ></v-card-text>
    <v-card-text
      v-if="book.genres || book.genres.length < 1"
      class="pb-0 pt-1 text-subtitle-1"
    >
      <span v-text="'Genres: '"></span>
      <span
        v-for="(genre, i) in book.genres"
        :key="i"
        v-text="i < book.genres.length - 1 ? `${genre}, ` : genre"
      ></span>
    </v-card-text>
    <v-card-text
      v-if="book.description"
      class="text-subtitle-1 text-justify"
      style="white-space: pre-line"
    >
      {{ shrinkedDescription }}
      <a
        @click="shrinked = !shrinked"
        v-if="splitDescription.length > maxShowLength"
        >{{ expandLink }}</a
      >
    </v-card-text>
  </div>
</template>

<script>
import shrinkDescription from "../../mixins/shrinkDescription";
import AuthorLinkHelper from "../author/AuthorLinksHelper";
export default {
  mixins: [shrinkDescription],
  props: {
    book: {
      required: true,
      type: Object,
    },
  },
  components: { "bs-author-links": AuthorLinkHelper },
  data() {
    return {
      showLength: 60,
      maxShowLength: 90,
    };
  },

  mounted() {
    this.generateDescription(
      this.book.description,
      this.showLength,
      this.maxShowLength
    );
  },
};
</script>
