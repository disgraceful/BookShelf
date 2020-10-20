import Vue from "vue";

export default {
  getAuthorById(authorId) {
    return Vue.http.get(`author/${authorId}`);
  },

  getAuthorBooks(authorId) {
    return Vue.http.get(`author/${authorId}/books`);
  },

  getAuthorSeries(authorId) {
    return Vue.http.get(`author/${authorId}/series`);
  },
};
