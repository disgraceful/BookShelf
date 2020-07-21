<template>
  <v-card flat>
    <v-container v-if="records">
      <v-card-title class="py-0">User Feed</v-card-title>
      <bs-user-record
        v-for="(record, name, index) in records"
        :key="name"
        :record="{date:name, value: record}"
      >
        <v-divider v-show="index<length-1"></v-divider>
      </bs-user-record>
    </v-container>
  </v-card>
</template>

<script>
import UserRecord from "./UserRecord.vue";
import { ServiceFactory } from "../../services/serviceFactory";
const feedService = ServiceFactory.get("feed");
export default {
  components: { "bs-user-record": UserRecord },
  data() {
    return {
      loading: false,
      records: null,
      length: 0
    };
  },
  async created() {
    this.loading = true;
    const response = await feedService.getUserFeed();
    this.records = response.body;
    this.length = Object.keys(this.records).length;
    this.loading = false;
  }
};
</script>
