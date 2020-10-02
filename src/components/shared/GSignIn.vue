c<template>
  <div id="gSignInWrapper">
    <v-btn id="customBtn">
      <img src="https://img.icons8.com/color/28/000000/google-logo.png" />
      <span class="text-capitalize">
        Login<span class="text-lowercase"> via </span> Google
      </span>
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    signInFnc: { type: Function, required: true },
  },
  data() {
    return {
      auth2: {},
    };
  },
  methods: {
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
          this.signInFnc(googleUser);
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

span.label {
  font-family: serif;
  font-weight: normal;
}

span.buttonText {
  display: inline-block;
  vertical-align: middle;
  padding-left: 20px;
  padding-right: 42px;
  font-size: 14px;
  font-weight: bold;
  /* Use the Roboto font that is loaded in the <head> */
  font-family: "Roboto", sans-serif;
}
</style>