<template>
  <v-btn id="customBtn" color="#fff">
    <img src="https://img.icons8.com/color/28/000000/google-logo.png" />
    <span class="text-capitalize"> Google </span>
  </v-btn>
</template>

<script>
export default {
  data() {
    return {
      auth2: {},
    };
  },
  methods: {
    signInWithGoogle(googleUser) {
      const id_token = googleUser.getAuthResponse().id_token;
      console.log("ID Token: " + id_token);

      //send Id_token to the backend
      this.$store.dispatch("signInUserGoogle", { token: id_token });
      googleUser.disconnect();
    },

    startApp() {
      gapi.load("auth2", () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id:
            "463636811603-dujav8toqr9ijfek13vfclg723dnqrfe.apps.googleusercontent.com",
          cookiepolicy: "single_host_origin",
          // Request scopes in addition to 'profile' and 'email'
          scope: "profile email",
        });
        this.attachSignin(document.getElementById("customBtn"));
      });
    },

    attachSignin(element) {
      this.auth2.attachClickHandler(
        element,
        {},
        (googleUser) => {
          this.signInWithGoogle(googleUser);
        },
        (error) => {}
      );
    },
  },
  mounted() {
    this.startApp();
  },
};
</script>

<style scoped>
#customBtn img {
  padding: 5px;
  padding-right: 12px;
  padding-left: 0px;
}
</style>