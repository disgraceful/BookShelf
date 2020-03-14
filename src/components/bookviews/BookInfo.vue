<template>
  <div>
    <v-card-title class="pt-2 headline font-weight-medium">{{
      book.title
    }}</v-card-title>
    <v-card-subtitle v-if="book.series" class="title">
      <router-link
        class="link-inherit highlight"
        :to="{ name: 'series', params: { id: book.series.id } }"
      >
        {{ book.series.fullName }}
      </router-link>
    </v-card-subtitle>
    <v-card-text class="pb-0 subtitle-1">
      by
      <router-link
        class="link-inherit highlight"
        v-for="(author, i) in book.authors"
        :key="i"
        :to="{ name: 'authors', params: { id: author.id } }"
        v-text="i < book.authors.length - 1 ? `${author.name}, ` : author.name"
      ></router-link>
    </v-card-text>
    <v-card-text
      v-if="book.goodreadsRating"
      class="pb-0 pt-0 subtitle-1 "
      v-text="`Goodreads rating: ${book.goodreadsRating}`"
    >
    </v-card-text>
    <v-card-text
      v-if="book.publishedYear"
      class="pb-0 pt-1 subtitle-1"
      v-text="`Published in: ${book.publishedYear}`"
    >
    </v-card-text>
    <v-card-text class="pb-0 pt-1 subtitle-1" v-text="`Pages: ${book.pages}`">
    </v-card-text>
    <v-card-text class="pb-0 pt-1 subtitle-1">
      <span>Genres: </span>
      <span
        v-for="(genre, i) in book.genres"
        :key="i"
        v-text="i < book.genres.length - 1 ? `${genre}, ` : genre"
      ></span>
    </v-card-text>
    <v-card-text
      v-if="book.description"
      class="subtitle-1 text-justify mb-2"
      style="white-space: pre-line"
    >
      {{ shrinkedDescription }}
      <a
        @click="shrinked = !shrinked"
        v-if="splitDescription.length > maxShowLength"
      >
        {{ expandLink }}</a
      ></v-card-text
    >
  </div>
</template>

<script>
import shrinkDescription from "../../mixins/shrinkDescription";
export default {
  data() {
    return {
      showLength: 60,
      maxShowLength: 90
    };
  },
  mixins: [shrinkDescription],
  props: {
    book: {
      required: true,
      type: Object
    }
  },
  mounted() {
    this.generateDescription(
      this.book.description,
      this.showLength,
      this.maxShowLength
    );
  }
};
</script>
