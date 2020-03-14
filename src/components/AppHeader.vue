<template>
  <v-card class="toolbar-wrapper">
    <v-toolbar color="teal" dark max-width="1200" style="margin:0 auto" flat>
      <v-col cols="auto" class="pl-0">
        <v-btn text class="subtitle-1" to="/">
          <v-icon left large class="title-icon">mdi-book-open-outline</v-icon>
          BookShelf
        </v-btn>
      </v-col>
      <v-spacer v-if="$mq === 'sm'"></v-spacer>
      <bs-search-bar v-if="userIsAuthenticated && $mq !== 'sm'"></bs-search-bar>
      <v-col cols="auto" v-if="$mq === 'sm'">
        <v-btn icon>
          <v-icon large>mdi-magnify</v-icon>
        </v-btn>
      </v-col>
      <v-spacer v-if="$mq !== 'sm'"></v-spacer>
      <v-toolbar-items v-if="$mq === 'lg'">
        <div
          class="link-wrapper"
          v-for="(link, index) in headerLinks"
          :key="link.name"
        >
          <v-btn text v-text="link.name"> </v-btn>
          <v-divider vertical v-if="index < headerLinks.length - 1"></v-divider>
        </div>
      </v-toolbar-items>
      <v-spacer v-if="$mq !== 'sm'"></v-spacer>
      <v-col cols="auto">
        <v-menu offset-y v-if="user && $mq !== 'lg'">
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon large> mdi-format-list-bulleted</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="item in headerLinks" :key="item.name"
              ><router-link :to="item.to" class="link-inherit">
                {{ item.name }}
              </router-link>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
      <v-col cols="auto" class="text-center">
        <v-menu v-model="menuActive" offset-y v-if="user">
          <template v-slot:activator="{ on }">
            <v-btn text v-on="on" v-if="$mq === 'lg'">
              <v-icon left> mdi-account</v-icon>
              {{ username }}
              <v-icon
                right
                large
                v-text="menuActive ? 'mdi-menu-up' : 'mdi-menu-down'"
              ></v-icon>
            </v-btn>
            <v-btn v-else icon v-on="on">
              <v-icon large> mdi-account</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="item in menuList"
              :key="item.name"
              @click="item.action"
              >{{ item.name }}
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-toolbar>
  </v-card>
</template>

<script>
import SearchBar from "./SearchBar";
export default {
  data() {
    return {
      menuActive: false,
      menuList: [
        {
          name: "Statistics",
          action: () =>
            this.$router.push({ name: "user", params: { id: this.user.id } })
        },
        { name: "Logout", action: this.logOut }
      ]
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
          { name: "Favorites", to: "favorites" },
          { name: "Content", to: "content" },
          { name: "New content", to: "content" }
        ];
      }
      return headerLinks;
    },
    user() {
      return this.$store.getters.getAuthUser;
    },
    userIsAuthenticated() {
      return this.user !== null && this.user !== undefined;
    },
    username() {
      return this.user.email.replace(new RegExp(/@[\s\S]*/g), "");
    }
  },
  methods: {
    logOut() {
      this.menuActive = false;
      this.$store.dispatch("logOutUser");
      this.$router.push({ name: "login" });
    }
  }
};
</script>

<style scoped>
.title-icon {
  margin-right: 1rem !important;
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
.link-wrapper > .v-btn {
  height: 100% !important;
}
.toolbar-wrapper {
  background-color: #009688 !important;
  border-bottom: 5px #004d40 solid !important;
  z-index: 50;
}
</style>
