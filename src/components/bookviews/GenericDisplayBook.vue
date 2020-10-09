<template>
  <v-card flat>
    <v-col cols="auto">
      <div style="position:relative">
        <v-img :src="book.imageUrl" width="130" height="190"></v-img>
        <slot name="actions"></slot>
      </div>
      <v-card-text class="px-0 pb-1 subtitle-2" style="max-width:140px">
        <router-link
          class="link-inherit highlight"
          :to="{ name: 'book', params: { id: book.id } }"
        >{{ book.title }}</router-link>
      </v-card-text>
      <bs-author-links
        :authors="book.authors"
        classes="px-0 py-1 subtitle-2"
        style="max-width:140px"
      ></bs-author-links>
    </v-col>
  </v-card>
</template>

<script>
import AuthorLinksHelper from "../author/AuthorLinksHelper";
export default {
  props: {
    book: {
      type: Object,
      required: true,
    },
  },
  components: { "bs-author-links": AuthorLinksHelper },
};
</script>