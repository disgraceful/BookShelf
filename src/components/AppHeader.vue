<template>
  <v-card>
    <v-toolbar elevation="2" color="teal" dark>
      <v-btn text large class="subtitle-1" to="/">
        <v-icon left large class="title-icon">mdi-book-open-outline</v-icon
        >BookShelf
      </v-btn>
      <v-spacer></v-spacer>
      <bs-search-bar></bs-search-bar>

      <v-spacer></v-spacer>
      <v-toolbar-items>
        <div
          class="link-wrapper"
          v-for="(link, index) in headerLinks"
          :key="link.name"
        >
          <v-btn class="link" text v-text="link.name" :to="{ name: link.to }">
          </v-btn>
          <v-divider vertical v-if="index < headerLinks.length - 1"></v-divider>
        </div>
      </v-toolbar-items>
      <v-spacer v-if="userIsAuthenticated"></v-spacer>
      <v-menu v-model="menuActive" offset-y v-if="userIsAuthenticated">
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on">
            <v-icon class="user-icon"> mdi-account</v-icon>
            {{ user.email }}
            <v-icon
              v-text="menuActive ? 'mdi-menu-up' : 'mdi-menu-down'"
            ></v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="item in menuList" :key="item"
            >{{ item }}
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar>
  </v-card>
</template>

<script>
import SearchBar from "./SearchBar";
export default {
  data() {
    return {
      menuActive: false,
      menuList: ["Statistics", "Logout"]
    };
  },
  components: {
    "bs-search-bar": SearchBar
  },
  computed: {
    headerLinks() {
      let headerLinks = [
        { name: "SignUp", to: "register" },
        { name: "SignIn", to: "login" }
      ];
      if (this.userIsAuthenticated) {
        headerLinks = [
          { name: "2Read", to: "2read" },
          { name: "Reading", to: "reading" },
          { name: "Finished", to: "finished" }
        ];
      }
      return headerLinks;
    },
    user() {
      return this.$store.getters.getAuthUser;
    },
    userIsAuthenticated() {
      return this.user !== null && this.user !== undefined;
    }
  },
  methods: {}
};
</script>

<style scoped>
.title-icon {
  margin-right: 2rem !important;
}
.user-icon {
  margin-right: 0.8rem !important;
}
.search-bar {
  min-width: 280px !important;
  padding-top: 1.5rem;
  position: relative;
}
.link-wrapper {
  display: flex;
  align-items: center;
}
.link-wrapper > .link {
  height: 100% !important;
}
.search-results {
  position: relative;
  top: -27px;
}
</style>
