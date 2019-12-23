<template>
  <v-app>
    <my-header></my-header>
    <router-view></router-view>
  </v-app>
</template>

<script>
import AppHeader from "./components/AppHeader";
export default {
  name: "BookShelfApp",
  data() {
    return {};
  },
  components: {
    "my-header": AppHeader
  }
};
</script>

