import Vue from "vue";

export default {
    getSeriesById(bookId, token) {
        return Vue.http.get(`books/${bookId}`, { headers: { 'X-Access-Token': token } })
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error));
    },
}
