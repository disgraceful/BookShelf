<template>
  <v-app>
    <bs-header></bs-header>
    <router-view></router-view>
  </v-app>
</template>

<script>
import ResponsiveHeader from "./components/header/ResponsiveHeader";
export default {
  name: "BookShelfApp",
  data() {
    return {};
  },
  components: {
    "bs-header": ResponsiveHeader
  }
};
</script>
