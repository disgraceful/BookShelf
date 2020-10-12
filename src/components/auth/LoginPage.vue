<template>
  <bs-auth loginInfo="Sign in" :onSubmit="signIn">
    <template v-slot:title>
      <v-card-title class="pb-0">Sign In </v-card-title>
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
