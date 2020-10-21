<template>
  <v-card flat>
    <bs-error-page v-if="error" :error="error"></bs-error-page>
    <v-container class="page-container" v-else>
      <bs-user-page @error="error = $event"></bs-user-page>
      <bs-user-feed @error="error = $event"></bs-user-feed>
    </v-container>
  </v-card>
</template>

<script>
import ErrorPage from "./shared/ErrorPage";
import UserPage from "./userviews/UserPage";
import UserFeed from "./userviews/UserFeed";

export default {
  components: {
    "bs-user-page": UserPage,
    "bs-user-feed": UserFeed,
    "bs-error-page": ErrorPage,
  },

  data() {
    return {
      error: null,
    };
  },
};
</script>
