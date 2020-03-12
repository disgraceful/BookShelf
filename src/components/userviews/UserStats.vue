<template>
  <v-card flat>
    <v-container>
      <v-card-title class="headline">User Statistics</v-card-title>
      <v-row>
        <v-col cols="6">
          <div style="max-width:350px">
            <bs-user-chart></bs-user-chart>
          </div>
        </v-col>
        <v-col cols="6">
          
        </v-col>
      </v-row>
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
