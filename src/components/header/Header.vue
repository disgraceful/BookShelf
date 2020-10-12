<template>
  <v-card class="toolbar-wrapper">
    <v-toolbar color="teal" dark max-width="1200" style="margin: 0 auto" flat>
      <v-col cols="auto" :class="lg ? 'pl-0' : 'px-0'" v-if="!xs">
        <v-btn text class="subtitle-1" to="/">
          <v-icon left large class="mr-4">mdi-book-open-outline</v-icon>
          BookShelf
        </v-btn>
      </v-col>
      <bs-xs-search v-if="xs"></bs-xs-search>
      <v-col :cols="$mq | mq({ xs: '', lg: 4 })" v-if="user">
        <bs-search-bar @minimized="searchbarMinimized = true"></bs-search-bar>
      </v-col>
      <v-spacer v-else></v-spacer>
      <bs-content-links></bs-content-links>
      <v-col
        cols="auto"
        class="text-center"
        :class="mdH ? 'px-2' : 'px-0'"
        v-if="user"
      >
        <bs-profile-menu></bs-profile-menu>
      </v-col>
    </v-toolbar>
  </v-card>
</template>

<script>
import headerLogic from "../../mixins/headerLogic";
import mediaQueryLogic from "../../mixins/mediaQueryLogic";
import ProfileMenu from "./headerComponents/ProfileMenu.vue";
import ContentLinks from "./headerComponents/ContentLinks.vue";
import SearchWrapper from "./headerComponents/SearchWrapper.vue";
import SearchBar from "./headerComponents/SearchBar";
export default {
  mixins: [headerLogic, mediaQueryLogic],
  components: {
    "bs-search-bar": SearchBar,
    "bs-profile-menu": ProfileMenu,
    "bs-content-links": ContentLinks,
    "bs-xs-search": SearchWrapper,
  },
};
</script>

<style scoped>
.toolbar-wrapper.v-card {
  background-color: #009688 !important;
  border-bottom: 5px #004d40 solid !important;
  z-index: 50;
}
</style>
