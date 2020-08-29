<template>
  <v-card flat>
    <v-container v-if="records">
      <v-card-title class="py-0">User Feed</v-card-title>
      <v-container class="py-0" v-for="(records, name) in activeRecords" :key="name">
        <v-row align="baseline">
          <v-col>
            <v-card-text class="pl-8 py-1 text-h6 font-weight-regular">{{ getDate(name) }}</v-card-text>
          </v-col>
          <v-col cols="9">
            <bs-user-record v-for="(record, index) in records" :key="index" :record="record"></bs-user-record>
          </v-col>
        </v-row>
        <v-divider></v-divider>
      </v-container>
      <!-- <bs-user-record
        v-for="(record,name) in activeRecords"
        :key="name"
        :record="{date:name,value:record}"
      ></bs-user-record>-->
      <v-row justify="end">
        <v-col cols="auto" class="pr-6">
          <a class="highlight" @click="toggleFeed()">{{showingMore? "Hide" : "Show all"}}</a>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import moment from "moment";
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
      activeRecords: null,
    };
  },
  methods: {
    getDate(date) {
      const momentDate = moment(date, "DD MMM YYYY");
      if (moment().isSame(momentDate, "days")) {
        return "Today";
      } else if (moment().subtract(1, "days").isSame(momentDate, "days")) {
        return "Yesterday";
      }
      return date;
    },
    toggleFeed() {
      this.showingMore = !this.showingMore;
      if (this.showingMore) this.activeRecords = this.records;
      else this.getFreshRecords();
    },
    getFreshRecords() {
      this.activeRecords = {};
      Object.keys(this.records)
        .filter((key, index) => index < 3)
        .forEach((key) => (this.activeRecords[key] = this.records[key]));
    },
  },
  async created() {
    this.loading = true;
    const response = await feedService.getUserFeed();
    this.records = response.body;
    this.getFreshRecords();
    this.length = Object.keys(this.records).length;
    this.loading = false;
    console.log(this.activeRecords);
  },
};
</script>
