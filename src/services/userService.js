import Vue from "vue";

export default {
    getUser(id) {
        return Vue.http.get("user", { params: { id } })
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error));
    },

    addToUserCollection(id, book, collection) {
        return Vue.http.post(`user/${collection}`, { userId: id, book: book })
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error));
    }
}
