import Vue from "vue";

export default {
    getAuthorById(authorId, token) {
        return Vue.http.get(`author/${authorId}`, { headers: { 'X-Access-Token': token } })
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error));
    },

    getAuthorSeries(authorId, token) {
        return Vue.http.get(`author/${authorId}/series`, { headers: { 'X-Access-Token': token } })
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error));
    }
}
