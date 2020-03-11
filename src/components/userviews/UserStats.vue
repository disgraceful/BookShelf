<template>
  <v-card flat>
    <v-container>
      <v-card-title class="headline">User Statistics</v-card-title>
      <bs-user-chart></bs-user-chart>
    </v-container>
  </v-card>
</template>

<script>
import UserGenreChart from "./UserGenreChart";
export default {
  components: {
    "bs-user-chart": UserGenreChart
  }
};
</script>
