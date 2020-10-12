<template>
  <v-btn
    dark
    color="#42A5F5"
    @click="signInWithTwitter"
    :loading="loading && sameProvider"
  >
    <img width="38" style="padding-right: 10px" :src="twitterIcon" />
    <!-- <span class="text-capitalize">Twitter</span> -->
    <span class="text-capitalize"
      >Login <span class="text-lowercase">via</span> Twitter
    </span>
  </v-btn>
</template>

<script>
import { ServiceFactory } from "../../services/serviceFactory";
const authService = ServiceFactory.get("auth");
export default {
  data() {
    return {
      twitterIcon: require("../../assets/twitter-32.png"),
    };
  },

  methods: {
    async signInWithTwitter() {
      const response = await authService.getTwitterAuthUrl();
      const url = response.body.url;
      window.open(url, "_self");
    },
  },

  computed: {
    loading() {
      return this.$store.getters.getLoading;
    },

    sameProvider() {
      return this.$store.getters.getProvider === "twitter";
    },
  },

  async mounted() {
    const query = this.$route.query;
    console.log(this.$route);
    if (query) {
      const token = query.oauth_token;
      const verifier = query.oauth_verifier;
      if (token && verifier) {
        this.$store.dispatch("signInUserTwitter", { token, verifier });
      } else {
        // go again to login with error
      }
    }
  },
};
</script>

