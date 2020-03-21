<template>
  <v-container class="pa-0">
    <v-container v-for="(item, i) in tabItems" :key="item.name" class="pa-0">
      <bs-panel-content :item="item">
        <v-divider v-if="i < tabItems.length - 1"></v-divider>
      </bs-panel-content>
    </v-container>
  </v-container>
</template>

<script>
import PanelContent from "./UserPanelContent";
export default {
  data() {
    return {
      tab: 0
    };
  },
  props: {
    tabItems: {
      type: Array,
      required: true
    }
  },
  components: {
    "bs-panel-content": PanelContent
  },
  methods: {
    expand() {},
    getBooks(tab) {
      return this.tabItems[tab].books;
    },
    pagesRead(tab) {
      return this.tabItems[tab].books.reduce(
        (prevValue, curValue) => prevValue + +curValue.userData.pagesRead,
        0
      );
    },
    getTabPos() {
      return this.tabItems.findIndex(item => item.books.length > 0);
    }
  },
  mounted() {
    this.tab = this.getTabPos();
  }
};
</script>
