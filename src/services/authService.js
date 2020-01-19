import Vue from "vue";

export default {
    signIn(email, password) {
        return Vue.http.post("auth/login", { email, password })
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error));
    },
    signUp(email, password) {
        return Vue.http.post("auth/register", { email, password })
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error));
    }
}
