<template>
  <v-card flat>
    <v-container v-if="!noFeed">
      <v-card-title class="py-0">User Feed</v-card-title>
      <v-container
        :class="sm || xs ? 'py-2' : 'py-0'"
        v-for="(records, name) in activeRecords"
        :key="name"
      >
        <v-row :align="sm || xs ? 'center' : 'baseline'" :no-gutters="sm || xs">
          <v-col :cols="sm ? '12' : 'auto'" style="min-width: 180px">
            <v-card-text class="py-1 text-h6 font-weight-regular">{{
              getDate(name)
            }}</v-card-text>
          </v-col>
          <v-col cols="auto">
            <bs-user-record
              v-for="(record, index) in records"
              :key="index"
              :record="record"
            ></bs-user-record>
          </v-col>
        </v-row>
        <v-divider></v-divider>
      </v-container>
      <v-row justify="end">
        <v-col cols="auto" class="pr-6">
          <a class="highlight" @click="toggleFeed()">{{
            showingMore ? "Hide" : "Show all"
          }}</a>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import moment from "moment";
import UserRecord from "./UserRecord.vue";
import mediaQuery from "../../mixins/mediaQueryLogic";
import { ServiceFactory } from "../../services/serviceFactory";
const feedService = ServiceFactory.get("feed");

export default {
  components: { "bs-user-record": UserRecord },
  mixins: [mediaQuery],
  data() {
    return {
      loading: false,
      records: null,
      length: 0,
      showingMore: false,
      activeRecords: null,
    };
  },

  computed: {
    noFeed() {
      if (!this.records) return false;
      return Object.keys(this.records).length === 0;
    },
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
      if (this.showingMore && this.length > 3)
        this.activeRecords = this.records;
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
    console.log(this.records);
    this.getFreshRecords();
    this.length = Object.keys(this.records).length;
    this.loading = false;
  },
};
</script>
