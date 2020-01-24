<template>
  <v-card flat>
    <v-row>
      <v-col auto>
        <v-img :src="book.smallImageUrl"></v-img>
      </v-col>
      <v-col>
        <v-card-text>
          {{ book.title }}
        </v-card-text>
        <v-card-text>
          {{ book.author.name }}
        </v-card-text>
      </v-col>
      <v-col>
        <v-rating small v-model="book.rating" hover></v-rating>
      </v-col>
      <v-col>
        <v-progress-linear value="15"></v-progress-linear>
        <sup>{{ book.pages }}</sup>
      </v-col>
    </v-row>
    <v-divider></v-divider>
  </v-card>
</template>

<script>
export default {
  props: ["book"]
};
</script>
