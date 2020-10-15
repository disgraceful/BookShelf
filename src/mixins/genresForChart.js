import { ServiceFactory } from "../services/serviceFactory";
const userService = ServiceFactory.get("user");

export default {
  data() {
    return {
      colors: [
        "#41B883",
        "#00D8FF",
        "#F9A825",
        "#FF3D00",
        "#2E7D32",
        "#00ACC1",
        "#EF5350",
        "#EC407A",
      ],
    };
  },
  methods: {
    async getChartData() {
      const response = await userService.getUserGenres();
      const genres = response.body;
      const sorted = Object.keys(genres).sort(function(a, b) {
        return genres[b] - genres[a];
      });
      const map = new Map();
      sorted.forEach((key) => map.set(key, genres[key]));

      const keys = new Array(...map.keys());
      const labels = keys.slice(0, 6);
      if (keys.length > 6) {
        labels.push("Other");
      }
      const values = new Array(...map.values());
      const data = values.slice(0, 6);
      if (values.length > 6) {
        data.push(
          values
            .slice(5, values.length - 1)
            .reduce((prevValue, curValue) => prevValue + curValue, 0)
        );
      }
      const chartData = {
        labels,
        datasets: [
          {
            label: "Data One",
            backgroundColor: this.colors,
            data,
          },
        ],
      };
      const options = {
        responsive: true,

        tooltips: {
          enabled: true,
        },
      };
      return { chartData, options };
    },
  },
};
