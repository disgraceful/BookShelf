<template>
  <v-card flat v-if="!noFeed && !error">
    <v-container class="py-0">
      <v-card-title v-if="mdH" class="py-0" :class="mdH ? 'px-2' : ''"
        >User Feed</v-card-title
      >
      <v-col
        v-for="(records, name, i) in activeRecords"
        :key="name"
        class="py-1"
      >
        <v-row :align="smL ? 'center' : 'baseline'" :no-gutters="smL">
          <v-col
            :cols="sm ? '12' : 'auto'"
            class="py-0"
            style="min-width: 180px"
          >
            <v-card-text
              :class="mdH ? 'px-2' : ''"
              class="py-0 text-h6 font-weight-regular"
              >{{ getDate(name) }}</v-card-text
            >
          </v-col>
          <v-col cols="auto" class="pa-2">
            <bs-user-record
              v-for="(record, index) in records"
              :key="index"
              :record="record"
            ></bs-user-record>
          </v-col>
        </v-row>
        <v-divider v-if="i < feedLength - 1"></v-divider>
      </v-col>
      <v-divider></v-divider>
      <v-row justify="end">
        <v-col cols="auto">
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
      error: null,
      records: null,
      length: 0,
      showingMore: false,
      activeRecords: null,
    };
  },

  computed: {
    noFeed() {
      if (!this.records) return true;
      return Object.keys(this.records).length === 0;
    },

    feedLength() {
      return this.activeRecords ? Object.keys(this.activeRecords).length : 0;
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

  created() {
    feedService
      .getUserFeed()
      .then((response) => {
        this.records = response.body;
        console.log(this.records);
        this.getFreshRecords();
        this.length = Object.keys(this.records).length;
      })
      .catch((error) => {
        this.error = error.body
          ? error.body
          : { message: "Connection to server failed. Please try later." };
        this.$emit("error", this.error);
      });
  },
};
</script>
