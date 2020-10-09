import Vue from "vue";

export default {
  uploadBook(book) {
    return Vue.http.post(`user/upload`, book);
  },

  getPrivateBooks() {
    return Vue.http.get("user/upload");
  },

  getPrivateBookById(bookId) {
    return Vue.http.get(`user/upload/${bookId}`);
  },

  removePrivateBook(bookId) {
    return Vue.http.delete("user/upload", { params: { id: bookId } });
  },
};
