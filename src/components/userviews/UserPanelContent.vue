<template>
  <v-card flat>
    <v-hover v-slot:default="{ hover }">
      <v-row
        :style="
          hover ? { backgroundColor: '#fafafa' } : { backgroundColor: '#fff' }
        "
        justify="space-between"
        align="center"
        class="mx-0"
        @click.stop="expanded = !expanded"
      >
        <v-card-title class="font-weight-regular">
          <v-badge color="transparent">
            {{ item.name }}
            <sup>{{ item.books.length }}</sup>
          </v-badge>
        </v-card-title>

        <v-btn icon>
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
      </v-row>
    </v-hover>
    <template v-if="expanded === true">
      <v-col v-for="(book, i) in item.books" :key="book.id" class="pt-0">
        <bs-horizontal-book :book="book">
          <v-divider v-if="i < item.books.length - 1"></v-divider>
        </bs-horizontal-book>
      </v-col>
    </template>
    <slot></slot>
  </v-card>
</template>

<script>
import HorizontalBook from "../bookviews/HorizontalBookView";
export default {
  data() {
    return {
      expanded: false,
    };
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  components: {
    "bs-horizontal-book": HorizontalBook,
  },
  methods: {
    pagesRead(tab) {
      return this.item.books.reduce(
        (prevValue, curValue) => prevValue + +curValue.userData.pagesRead,
        0
      );
    },
  },
};
</script>
