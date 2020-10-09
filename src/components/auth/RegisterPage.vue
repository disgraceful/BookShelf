<template>
  <bs-auth loginInfo="SignUp" :onSubmit="signUp">
    <template v-slot:title>
      <v-card-title>Create new Account </v-card-title>
    </template>
    <template v-slot:text>
      <v-card-text class="body-1 pb-1">Sign up with:</v-card-text>
    </template>
  </bs-auth>
</template>

<script>
import AuthComponent from "./AuthComponent";
export default {
  components: {
    "bs-auth": AuthComponent,
  },
  methods: {
    signUp(email, password) {
      this.$store.dispatch("signUpUser", {
        email,
        password,
      });
    },
  },
};
</script>
