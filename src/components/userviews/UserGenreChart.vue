<template>
  <bs-pie-chart
    v-if="data"
    :chart-data="data"
    :options="options"
  ></bs-pie-chart>
</template>

<script>
import PieChart from "../shared/PieChart";
import genresForChart from "../../mixins/genresForChart";
export default {
  data() {
    return {
      data: null,
      options: null
    };
  },
  computed: {
    user() {
      return this.$store.getters.getAuthUser;
    }
  },
  components: {
    "bs-pie-chart": PieChart
  },
  mixins: [genresForChart],
  async created() {
    const chart = await this.getChartData(this.user.token);
    this.data = chart.chartData;
    this.options = chart.options;
  }
};
</script>
