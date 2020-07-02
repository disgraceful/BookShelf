import Vue from "vue";

export default {
  getSeriesById(seriesId) {
    return Vue.http.get(`series/${seriesId}`);
  },
};
