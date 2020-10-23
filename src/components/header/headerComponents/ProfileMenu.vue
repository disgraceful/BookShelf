<template>
  <v-menu v-model="menuActive" offset-y>
    <template v-slot:activator="{ on }">
      <v-btn text v-on="on" v-if="lg">
        <v-icon left>mdi-account</v-icon>
        {{ username }}
        <v-icon right large v-text="menuActive ? 'mdi-menu-up' : 'mdi-menu-down'"></v-icon>
      </v-btn>
      <v-btn icon v-on="on" v-else>
        <v-icon large>mdi-account</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item v-for="item in menuList" :key="item.name" @click="item.action">
        {{ item.name }}
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import headerLogic from "../../../mixins/headerLogic";
import mediaQueryLogic from "../../../mixins/mediaQueryLogic";
export default {
  mixins: [headerLogic, mediaQueryLogic],
};
</script>
