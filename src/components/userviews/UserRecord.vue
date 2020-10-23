<template>
  <v-card-text class="py-1 text-subtitle-1">
    <v-row align="center">
      <v-col cols="auto" class="py-0 px-0 pl-1" v-if="!record.data.rating">
        {{ record.message }}
      </v-col>

      <v-rating v-else readonly v-model="record.data.rating" dense class="d-inline pb-1"></v-rating>
      <router-link :to="{ name: 'book', params: { id: record.data.id } }" class="highlight px-2">
        {{ shrinkedDescription }}
      </router-link>
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
