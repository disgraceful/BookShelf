<template>
  <v-card flat>
    <v-container>
      <v-row>
        <v-col cols="auto">
          <v-img
            :src="book.imgUrl"
            content
            max-height="250px"
            max-width="200"
          ></v-img>
        </v-col>
        <v-col>
          <v-card-title class="pt-0 ">{{ book.name }}</v-card-title>
          <v-card-subtitle>{{ book.author }}</v-card-subtitle>
          <v-card-text>{{ book.anotation }}</v-card-text>
          <v-rating
            v-model="book.rating"
            readonly
            :half-increments="true"
            large
          ></v-rating>
          <v-progress-linear
            v-model="book.progress"
            height="16px"
          ></v-progress-linear>
        </v-col>
      </v-row>
    </v-container>
    <v-divider></v-divider>
  </v-card>
</template>

<script>
export default {
  props: ["book"]
};
</script>
