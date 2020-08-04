import Vue from "vue";

export default {
  uploadBook(book) {
    return Vue.http.post(`book/upload`, book);
  },
};
