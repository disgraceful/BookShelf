<template>
  <v-card flat>
    <div class="d-flex flex-row justify-space-between align-baseline">
      <v-card-title class="font-weight-regular">My Activity</v-card-title>
      <v-btn text>Edit</v-btn>
    </div>
    <v-divider></v-divider>
    <v-card-text class="black--text subtitle-1"
      >Finished: {{ formatDate(userData.startDate) }} –
      {{ formatDate(userData.endDate) }}</v-card-text
    >
    <v-card-text
      v-if="userData.notes && userData.notes !== ''"
      class="pt-0 black--text subtitle-1"
      >My review: {{ userData.notes }}</v-card-text
    >
    <v-btn text v-else>Add Review</v-btn>
  </v-card>
</template>

<script>
import moment from "moment";
export default {
  props: {
    userData: {
      required: true,
      type: Object
    }
  },
  methods: {
    formatDate(date) {
      return date ? moment(date).format("MMMM Do YYYY") : "";
    }
  }
};
</script>
