<template>
  <v-card flat>
    <v-container>
      <v-card-text class="text-h5 font-weight-regular text-center pa-2">
        {{ error.message }}
      </v-card-text>
      <v-card-text class="text-h6 font-weight-regular text-center pa-2">
        Reload the page or go to
        <router-link to="/home">Home</router-link>
      </v-card-text>
    </v-container>
  </v-card>
</template>

<script>
export default {
  props: ["error"],
};
</script>
