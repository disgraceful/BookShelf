import Vue from "vue";

export default {
  getUserFeed() {
    return Vue.http.get(`user/feed`);
  },

  getUserFeedByDate(date) {
    return Vue.http.get(`user/feed`, { params: { date } });
  },
};
