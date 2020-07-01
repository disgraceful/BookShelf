import Vue from "vue";

export default {
  getUser() {
    return Vue.http.get("user");
  },

  addToUserCollection(book, collection) {
    return Vue.http.post(`user/${collection}`, { book });
  },

  getUserCollection(collection) {
    return Vue.http.get(`user/${collection}`);
  },

  getAllUserBooks() {
    return Vue.http.get(`user/books`);
  },

  removeFromUserCollection(bookId) {
    return Vue.http.delete("user/collection", {
      params: { bookId: bookId },
    });
  },

  getFavorites() {
    return Vue.http.get("user/favorite");
  },

  setFavorite(book) {
    return Vue.http.post("user/favorite", { book });
  },

  updateBook(book) {
    return Vue.http.put("user/collection", { book });
  },

  getUserGenres() {
    return Vue.http.get("user/genres");
  },
};
