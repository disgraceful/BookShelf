import Vue from "vue";

export default {
    getBookById(bookId, token) {
        return Vue.http.get(`books/${bookId}`, { headers: { 'X-Access-Token': token } })
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error));
    },

    searchBook(text, token) {
        return Vue.http.get(`books/search/${text}`, { headers: { 'X-Access-Token': token } })
            .then(response => Promise.resolve(response.data))
            .catch(error => Promise.reject(error));
    }
}
