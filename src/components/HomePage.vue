<template>
  <v-card flat>
    <v-container>
      <bs-user-stats></bs-user-stats>
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
    "bs-user-stats": UserPage,
    "bs-user-feed": UserFeed
  }
};
</script>
