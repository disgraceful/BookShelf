<template>
  <v-btn id="customBtn" color="#fff" :loading="loading && sameProvider">
    <img src="https://img.icons8.com/color/28/000000/google-logo.png" />
    <span class="text-none">{{ text }} via Google </span>
  </v-btn>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: "Login",
    },
  },

  data() {
    return {
      auth2: {},
    };
  },

  computed: {
    loading() {
      return this.$store.getters.getLoading;
    },

    sameProvider() {
      return this.$store.getters.getProvider === "google";
    },
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
            //ummm prolly should add this to .env file or something...
            "463636811603-dujav8toqr9ijfek13vfclg723dnqrfe.apps.googleusercontent.com",
          cookiepolicy: "single_host_origin",
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