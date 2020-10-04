<template>
  <bs-auth loginInfo="Sign In" :onSubmit="signIn">
    <template v-slot:title>
      <v-card-title>Sign In </v-card-title>
    </template>
    <template v-slot:text>
      <v-card-text class="body-1 pb-1">Sign in with:</v-card-text>
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
    signIn(email, password) {
      this.$store.dispatch("signInUser", {
        email,
        password,
      });
    },
  },
};
</script>
