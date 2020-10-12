<template>
  <v-container class="pa-0">
    <v-container v-for="(item, i) in tabItems" :key="i" class="pa-0">
      <v-hover v-slot:default="{ hover }">
        <v-row
          :style="
            hover ? { backgroundColor: '#fafafa' } : { backgroundColor: '#fff' }
          "
          justify="space-between"
          align="center"
          class="mx-0"
          @click.stop="expand(i)"
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

      <template v-if="expanded === true && tab === i">
        <v-col v-for="(book, i) in item.books" :key="book.id" class="pt-0">
          <bs-horizontal-book :book="book">
            <v-divider v-if="i < item.books.length - 1"></v-divider>
          </bs-horizontal-book>
        </v-col>
      </template>
      <v-divider v-if="i < tabItems.length - 1"></v-divider>
    </v-container>
  </v-container>
</template>

<script>
import PanelContent from "./UserPanelContent";
import HorizontalBook from "../bookviews/HorizontalBookView";
export default {
  data() {
    return {
      tab: 0,
      expanded: false,
    };
  },
  props: {
    tabItems: {
      type: Array,
      required: true,
    },
  },
  components: {
    "bs-horizontal-book": HorizontalBook,
  },

  methods: {
    expand(tab) {
      this.tab = tab;
      this.expanded = !this.expanded;
    },
  },
};
</script>
