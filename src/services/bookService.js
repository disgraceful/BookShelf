import Vue from "vue";

export default {
    getBookById(bookId, userId) {
        return Vue.http.get(`books/${bookId}-${userId}`)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error));
    },

    searchBook(text) {
        return Vue.http.get("books/search", { params: { search: text } })
            .then(response => Promise.resolve(response.data))
            .catch(error => Promise.reject(error));
    }
}
