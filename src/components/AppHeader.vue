<template>
  <v-card>
    <v-toolbar elevation="2" color="teal" dark>
      <v-btn text large class="subtitle-1" to="/">
        <v-icon left large class="title-icon">mdi-book-open-outline</v-icon
        >BookShelf
      </v-btn>
      <v-spacer></v-spacer>
      <v-col
        sm6
        md3
        align-self="center"
        class="pb-0 pr-0 pl-0 search-bar"
        :style="{ top: searchActive ? '146px' : 0 }"
        v-if="userIsAuthenticated"
      >
        <v-text-field
          ref="search"
          dense
          outlined
          label="Search books"
          v-model="searchQuery"
          append-icon="mdi-magnify"
          @input="search()"
        ></v-text-field>

        <v-list class="search-results pa-0" light>
          <template v-for="(item, index) in searchResults">
            <v-divider :key="index"></v-divider>
            <v-list-item
              :key="item.title"
              :to="{ name: 'book', params: { id: item.id } }"
            >
              <v-list-item-avatar tile height="56px" width="46px">
                <v-img :src="item.smallImageUrl"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title
                  v-text="`${item.title} ${item.seriesTitle}`"
                ></v-list-item-title>
                <v-list-item-subtitle
                  v-text="`by ${item.authorName}`"
                ></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-col>

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
export default {
  data() {
    return {
      menuActive: false,
      menuList: ["Statistics", "Logout"],
      searchQuery: "",
      searchResults: []
    };
  },
  computed: {
    searchActive() {
      return this.searchResults.length > 0;
    },
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
  methods: {
    search() {
      if (this.searchQuery === undefined || this.searchQuery === "") {
        this.searchResults = [];
      }

      this.$http
        .get("books/search", { params: { search: this.searchQuery } })
        .then(
          response => {
            this.searchResults = response.body.slice(0, 4);
          },
          error => {
            console.error(error);
            this.searchResults = [];
          }
        );
    }
  }
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
