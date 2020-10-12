<template>
  <v-app>
    <bs-header></bs-header>
    <router-view></router-view>
  </v-app>
</template>

<script>
import Header from "./components/header/Header";
export default {
  name: "BookShelfApp",
  components: {
    "bs-header": Header,
  },
  data() {
    return {};
  },
};
</script>
