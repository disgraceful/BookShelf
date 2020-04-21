import Vue from "vue";

export default {
    getUser(token) {
        return Vue.http.get("user", { headers: { 'X-Access-Token': token } })
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error));
    },

    addToUserCollection(token, book, collection) {
        return Vue.http.post(`user/books/${collection}`, { book: book }, { headers: { 'X-Access-Token': token } })
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error));
    },

    getUserCollection(token, collection) {
        return Vue.http.get(`user/books/${collection}`, { headers: { 'X-Access-Token': token } })
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error));
    },

    getAllUserBooks(token) {
        return Vue.http.get(`user/books`, { headers: { 'X-Access-Token': token } })
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error));
    },

    removeFromUserCollection(token, bookId) {
        return Vue.http.delete("user/books", { params: { bookId: bookId }, headers: { 'X-Access-Token': token } })
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error));
    },

    getFavorites(token) {
        return Vue.http.get("user/books/favorite", { headers: { 'X-Access-Token': token } })
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error));
    },

    setFavorite(token, book) {
        return Vue.http.post("user/books/favorite", { book: book }, { headers: { 'X-Access-Token': token } })
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error));
    },

    updateBook(token, book) {
        return Vue.http.put("user/collection", { book: book }, { headers: { 'X-Access-Token': token } })
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error));
    },

    getUserGenres(token) {
        return Vue.http.get("user/books", { headers: { 'X-Access-Token': token } })
            .then(response => Promise.resolve(response.data))
            .catch(error => Promise.reject(error));
    }
}
