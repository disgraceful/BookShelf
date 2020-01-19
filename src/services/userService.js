import Vue from "vue";

export default {
    getUser(id) {
        return Vue.http.get("user", { params: { id } })
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error));
    }
}
