<template>
  <bs-auth loginInfo="Sign up" :onSubmit="signUp">
    <template v-slot:title>
      <v-card-title class="pb-0">Create new account </v-card-title>
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
