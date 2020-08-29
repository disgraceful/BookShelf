<template>
  <v-card-text :class="classes">
    by
    <template v-if="isAuthorsArray">
      <router-link
        class="link-inherit highlight"
        v-for="(author, i) in authors"
        :key="i"
        :to="{ name: 'authors', params: { id: author.id } }"
        v-text="
            i < authors.length - 1 ? `${author.name}, ` : author.name
          "
      ></router-link>
    </template>
    <template v-else>{{authors}}</template>
  </v-card-text>
</template>

<script>
export default {
  props: {
    authors: {
      required: true,
    },
    classes: {
      type: String,
      required: false,
    },
  },
  computed: {
    isAuthorsArray() {
      return Array.isArray(this.authors);
    },
  },
};
</script>