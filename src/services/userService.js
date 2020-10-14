import Vue from "vue";

export default {
  getUser() {
    return Vue.http.get("user");
  },

  addToUserCollection(book, collection) {
    return Vue.http.post(`user/books/${collection}`, { book });
  },

  getUserCollection(collection) {
    return Vue.http.get(`user/books/${collection}`);
  },

  getAllUserBooks() {
    return Vue.http.get(`user/books`);
  },

  removeFromUserCollection(bookId) {
    return Vue.http.delete("user/books", {
      params: { bookId },
    });
  },

  getFavorites() {
    return Vue.http.get("user/books/favorite");
  },

  setFavorite(book) {
    return Vue.http.post("user/books/favorite", { book });
  },

  updateBook(book) {
    return Vue.http.put("user/books", { book });
  },

  getUserGenres() {
    return Vue.http.get("user/genres");
  },
};
