<template>
  <v-card flat>
    <v-container v-if="records">
      <v-card-title class="py-0">User Feed</v-card-title>
      <bs-user-record
        v-for="(record,name) in activeRecords"
        :key="name"
        :record="{date:name,value:record}"
      ></bs-user-record>
      <v-row justify="end">
        <v-col cols="auto" class="pr-6">
          <a class="highlight" @click="toggleFeed()">{{showingMore? "Hide" : "Show all"}}</a>
        </v-col>
      </v-row>
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
      length: 0,
      showingMore: false,
      activeRecords: null
    };
  },
  methods: {
    toggleFeed() {
      this.showingMore = !this.showingMore;
      if (this.showingMore) this.activeRecords = this.records;
      else this.getFreshRecords();
    },
    getFreshRecords() {
      this.activeRecords = {};
      Object.keys(this.records)
        .filter((key, index) => index < 3)
        .forEach(key => (this.activeRecords[key] = this.records[key]));
    }
  },
  async created() {
    this.loading = true;
    const response = await feedService.getUserFeed();
    this.records = response.body;
    this.getFreshRecords();
    this.length = Object.keys(this.records).length;
    this.loading = false;
  }
};
</script>
