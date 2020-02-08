<template>
  <v-card flat>
    <v-container>
      <v-card-text class="text-center headline black--text"
        >Ooops! Something went wrong</v-card-text
      >
      <v-card-text class="title font-weight-regular text-center pa-2">
        Details: {{ error.message }}
      </v-card-text>
      <v-card-text class="title font-weight-regular text-center pa-2">
        Reload the page or go to <router-link to="/home"> Home </router-link>
      </v-card-text>
    </v-container>
  </v-card>
</template>

<script>
export default {
  props: { error: Object }
};
</script>
