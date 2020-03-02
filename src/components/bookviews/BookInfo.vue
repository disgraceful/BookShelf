<template>
  <div>
    <v-card-title class="pt-2 headline font-weight-medium">{{
      book.title
    }}</v-card-title>
    <v-card-subtitle v-if="book.series" class="title">
      <router-link
        class="link-inherit"
        :to="{ name: 'series', params: { id: book.series.id } }"
      >
        {{ book.series.fullName }}
      </router-link>
    </v-card-subtitle>
    <v-card-text class="pb-0 subtitle-1">
      <span>by </span>
      <span
        v-for="(author, i) in book.authors"
        :key="i"
        v-text="i < book.authors.length - 1 ? `${author.name}, ` : author.name"
      ></span>
    </v-card-text>
    <v-card-text
      v-if="book.goodreadsRating"
      class="pb-0 subtitle-1 "
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
      <a @click="shrinked = !shrinked" v-if="splitDescription.length > 90">
        {{ expandLink }}</a
      ></v-card-text
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      splitDescription: "",
      shrinked: true
    };
  },
  computed: {
    expandLink() {
      return this.shrinked ? "...more" : "less";
    },
    isShrinked() {
      return this.splitDescription.length > 90;
    },
    shrinkedDescription() {
      if (this.shrinked && this.splitDescription.length > 90) {
        let shortDesc = this.splitDescription;
        return shortDesc.slice(0, 60).join(" ");
      } else {
        return this.book.description;
      }
    }
  },
  props: {
    book: {
      required: true,
      type: Object
    }
  },
  mounted() {
    this.splitDescription = this.book.description.split(" ");
  }
};
</script>

<style scoped></style>
