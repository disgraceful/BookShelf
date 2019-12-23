<template>
  <v-card>
    <v-toolbar elevation="2" color="teal" dark>
      <v-btn text large class="subtitle-1">
        <v-icon left large class="title-icon">mdi-book-open-outline</v-icon
        >BookShelf
      </v-btn>
      <v-spacer></v-spacer>
      <v-flex sm6 md3 align-self="center" class="search-bar">
        <v-text-field
          dense
          outlined
          label="Search"
          append-icon="mdi-magnify"
        ></v-text-field>
      </v-flex>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text :to="{ name: '2read' }">2Read</v-btn>
        <v-divider vertical></v-divider>
        <v-btn text :to="{ name: 'reading' }">Reading</v-btn>
        <v-divider vertical></v-divider>
        <v-btn text>Finished</v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-menu v-model="menuActive" offset-y>
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on">
            <v-icon class="user-icon"> mdi-account</v-icon>
            {{ user.login }}
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
      user: { email: "hatemyself393@gmail.com", login: "hatemyself" },
      menuActive: false,
      menuList: ["Statistics", "Logout"]
    };
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
  padding-top: 1.6rem;
}
</style>
