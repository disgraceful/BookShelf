<template>
  <v-toolbar color="teal" dark max-width="1200" style="margin:0 auto" flat>
    <v-col cols="auto" class="px-0">
      <v-btn text class="subtitle-1" to="/">
        <v-icon left large class="title-icon">mdi-book-open-outline</v-icon>
        BookShelf
      </v-btn>
    </v-col>
    <v-col>
      <bs-search-bar v-if="userIsAuthenticated"></bs-search-bar>
    </v-col>
    <v-spacer></v-spacer>
    <v-col cols="auto" v-if="$mq === 'sm'">
      <v-btn icon>
        <v-icon large>mdi-magnify</v-icon>
      </v-btn>
    </v-col>
    <v-col cols="auto">
      <v-menu offset-y v-if="user">
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
    <v-col cols="auto" class="text-center px-0">
      <v-menu v-model="menuActive" offset-y v-if="user">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
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
</template>

<script>
import headerLogic from "../../mixins/headerLogic";
export default {
  mixins: [headerLogic]
};
</script>
