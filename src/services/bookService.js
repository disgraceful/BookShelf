import Vue from "vue";

export default {
  getBookById(bookId) {
    return Vue.http.get(`books/${bookId}`);
  },

  searchBook(text) {
    return Vue.http.get(`books/search`, {
      params: { query: text },
    });
  },
};
