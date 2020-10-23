<template>
  <v-btn dark color="#3F51B5" @click="checkLoginStatus()">
    <img width="28" :src="require('../../assets/facebook-32.png')" />
    <span class="text-capitalize">Facebook</span>
  </v-btn>
  <!-- <div
    class="fb-login-button"
    data-size="large"
    data-button-type="login_with"
    data-layout="default"
    data-auto-logout-link="false"
    data-use-continue-as="false"
    data-width=""
    scope="public_profile,email"
  ></div> -->
</template>

<script>
export default {
  data() {
    return {
      fbObj: null,
    };
  },
  methods: {
    checkLoginStatus() {
      try {
        console.log("happening");
        this.fbObj.getLoginStatus(function(event) {
          console.log(event);
          if (event.authResponse) {
            console.log(event.authResponse.accessToken);
            // User is signed-in Facebook.
          }
        });
      } catch (error) {
        console.log(error);
      }
      //   if (event.authResponse) {
      //     if (event.authResponse) {
      //       console.log(event.authResponse.accessToken);
      //       //   User is signed-in Facebook.
      //     }
      //   }
    },

    initFBScript(d, s, id) {
      let js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    },
  },

  created() {
    this.initFBScript(document, "script", "facebook-jssdk");
    window.fbAsyncInit = function() {
      FB.init({
        appId: "634150080579005",
        cookie: true,
        xfbml: true,
        version: "v8.0",
      });

      FB.AppEvents.logPageView();
    };
    FB.Event.subscribe("auth.authResponseChange", this.checkLoginStatus);
    this.fbObj = FB;
  },
};
</script>
