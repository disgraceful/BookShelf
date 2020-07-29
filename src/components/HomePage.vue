<template>
  <v-card flat>
    <v-container class="page-container">
      <bs-user-page></bs-user-page>
      <bs-user-feed></bs-user-feed>
    </v-container>
  </v-card>
</template>

<script>
import UserPage from "./userviews/UserPage";
import UserFeed from "./userviews/UserFeed";
export default {
  data() {
    return {};
  },
  components: {
    "bs-user-page": UserPage,
    "bs-user-feed": UserFeed
  }
};
</script>
