<template>
  <v-card flat>
    <v-container>
      <v-img :src="imgUrl" max-height="200" contain></v-img>
      <v-card-title>{{ name }}</v-card-title>
      <v-card-text>{{ author }}</v-card-text>
    </v-container>
  </v-card>
</template>

<script>
export default {
  props: { name: String, author: String, imgUrl: String }
};
</script>

<style scoped></style>
