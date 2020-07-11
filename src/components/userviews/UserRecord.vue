<template>
  <v-card flat>
    <v-row align="baseline">
      <v-col cols="auto">
        <v-card-text class="pl-10 py-1 text-h6 font-weight-regular">{{record.date}}</v-card-text>
      </v-col>
      <v-col>
        <v-card-text class="py-1 text-subtitle-1" v-for="(text,i) in record.texts" :key="text">
          {{text}}
          <a class="highlight">{{record.books[i].name}}</a>
        </v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: {
    record: {
      type: Object,
      required: true
    }
  }
};
</script>