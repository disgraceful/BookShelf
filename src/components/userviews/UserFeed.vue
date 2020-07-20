<template>
  <v-card flat>
    <v-container v-if="records">
      <v-card-title class="py-0">User Feed</v-card-title>
      <bs-user-record
        v-for="(record, name) in records"
        :key="name"
        :record="{date:name, value: record}"
      ></bs-user-record>
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
      records: null
    };
  },
  async created() {
    this.loading = true;
    const response = await feedService.getUserFeed();
    this.records = response.body;
    this.loading = false;
  }
};
</script>
