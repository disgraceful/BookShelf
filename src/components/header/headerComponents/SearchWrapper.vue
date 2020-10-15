<template>
  <v-row align="center" style="flex-wrap: nowrap">
    <v-col cols="auto" :class="lg ? 'pl-0' : 'px-0'" v-if="searchbarMinimized">
      <v-btn text class="subtitle-1" to="/">
        <v-icon left large class="mr-4">mdi-book-open-outline</v-icon>
        BookShelf
      </v-btn>
    </v-col>
    <v-spacer v-if="searchbarMinimized"></v-spacer>
    <v-col
      :cols="$mq | mq({ xs: '', lg: 4 })"
      v-if="user && !searchbarMinimized"
    >
      <bs-search-bar @minimized="searchbarMinimized = true"></bs-search-bar>
    </v-col>
    <v-col cols="auto" class="pl-0" v-if="user && searchbarMinimized">
      <v-btn icon @click="searchbarMinimized = false">
        <v-icon large>mdi-magnify</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import headerLogic from "../../../mixins/headerLogic";
import mediaQueryLogic from "../../../mixins/mediaQueryLogic";
import SearchBar from "./SearchBar.vue";
export default {
  mixins: [headerLogic, mediaQueryLogic],
  components: {
    "bs-search-bar": SearchBar,
  },
  data() {
    return {
      searchbarMinimized: true,
    };
  },
};
</script>
