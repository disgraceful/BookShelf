import Vue from "vue";

export default {
    getBookById(id) {
        return Vue.http.get("books", { params: { id: id } })
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error));
    }
}
