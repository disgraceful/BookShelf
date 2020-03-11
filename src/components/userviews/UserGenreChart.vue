<template>
  <v-row>
    <v-col cols="4" md="6">
      <bs-pie-chart :chart-data="data" :options="options"></bs-pie-chart>
    </v-col>
    <v-col cols="6"></v-col>
  </v-row>
</template>

<script>
import PieChart from "../shared/PieChart";
export default {
  data() {
    return {
      data: null,
      options: null
    };
  },
  components: {
    "bs-pie-chart": PieChart
  },
  created() {
    this.data = {
      labels: ["Green", "Red", "Blue"],
      datasets: [
        {
          label: "Data One",
          backgroundColor: ["#41B883", "#E46651", "#00D8FF"],
          data: [1, 10, 5]
        }
      ]
    };
    this.options = {
      responsive: true,
      legend: {
        display: false
      },
      tooltips: {
        enabled: true
      }
    };
  }
};
</script>
