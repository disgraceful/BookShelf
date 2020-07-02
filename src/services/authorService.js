import Vue from "vue";

export default {
  getAuthorById(authorId) {
    return Vue.http.get(`author/${authorId}`);
  },

  getAuthorSeries(authorId) {
    return Vue.http.get(`author/${authorId}/series`);
  },
};
