<template>
  <v-toolbar-items v-if="lgScreen || mdScreen">
    <div
      class="link-wrapper"
      v-for="(link, index) in headerLinks"
      :key="link.name"
    >
      <v-btn text v-text="link.name"> </v-btn>
      <v-divider vertical v-if="index < headerLinks.length - 1"></v-divider>
    </div>
  </v-toolbar-items>
  <v-col cols="auto" class="px-0" v-else>
    <v-menu offset-y>
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
</template>

<script>
import headerLogic from "../../../mixins/headerLogic";
import mediaQueryLogic from "../../../mixins/mediaQueryLogic";
export default {
  mixins: [headerLogic, mediaQueryLogic]
};
</script>

<style scoped>
.link-wrapper {
  display: flex;
  align-items: center;
}

.link-wrapper > .v-btn {
  height: 100% !important;
}
</style>
