<template>
  <v-card-text class="py-1 text-subtitle-1">
    <v-row align="center">
      <template v-if="!record.data.rating">{{ record.message }}</template>
      <v-rating v-else readonly v-model="record.data.rating" dense></v-rating>
      <v-col class="py-0" cols="auto">
        <router-link :to="{name:'book', params:{id:record.data.id} }">{{shrinkedDescription}}</router-link>
      </v-col>
    </v-row>
  </v-card-text>
</template>

<script>
import shrinkDesc from "../../mixins/shrinkDescription";
export default {
  props: {
    record: {
      type: Object,
      required: true,
    },
  },
  mixins: [shrinkDesc],
  created() {
    this.generateDescription(this.record.data.title, 10, 10);
  },
};
</script>