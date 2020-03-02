import Vue from "vue";

export default {
    getSeriesById(seriesId, token) {
        return Vue.http.get(`series/${seriesId}`, { headers: { 'X-Access-Token': token } })
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error));
    },
}
