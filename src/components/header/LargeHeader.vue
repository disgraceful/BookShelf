<template>
  <v-toolbar color="teal" dark max-width="1200" style="margin:0 auto" flat>
    <v-col cols="auto" class="pl-0">
      <v-btn text class="subtitle-1" to="/">
        <v-icon left large class="title-icon">mdi-book-open-outline</v-icon>
        BookShelf
      </v-btn>
    </v-col>
    <v-col cols="4">
      <bs-search-bar v-if="userIsAuthenticated"></bs-search-bar>
    </v-col>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <div
        class="link-wrapper"
        v-for="(link, index) in headerLinks"
        :key="link.name"
      >
        <v-btn text v-text="link.name"> </v-btn>
        <v-divider vertical v-if="index < headerLinks.length - 1"></v-divider>
      </div>
    </v-toolbar-items>
    <v-spacer v-if="user"></v-spacer>
    <v-col cols="auto" class="text-center" v-if="user">
      <v-menu v-model="menuActive" offset-y>
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on">
            <v-icon left> mdi-account</v-icon>
            {{ username }}
            <v-icon
              right
              large
              v-text="menuActive ? 'mdi-menu-up' : 'mdi-menu-down'"
            ></v-icon>
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
</template>

<script>
import headerLogic from "../../mixins/headerLogic";
export default {
  mixins: [headerLogic]
};
</script>
