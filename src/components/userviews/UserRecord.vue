<template>
  <v-card flat>
    <v-container class="py-0">
      <v-row align="baseline">
        <v-col>
          <v-card-text class="pl-8 py-1 text-h6 font-weight-regular">{{date}}</v-card-text>
        </v-col>
        <v-col cols="9">
          <v-card-text
            class="py-1 text-subtitle-1"
            v-for="(record,index) in record.value"
            :key="index"
          >
            <v-row align="center">
              <template v-if="!record.data.rating">{{record.message}}</template>
              <v-rating v-else readonly v-model="record.data.rating" dense></v-rating>
              <v-col class="py-0" cols="auto">
                <router-link :to="{name:'book', params:{id:record.data.id} }">{{record.data.title}}</router-link>
              </v-col>
            </v-row>
          </v-card-text>
        </v-col>
      </v-row>
      <v-divider></v-divider>
    </v-container>
  </v-card>
</template>

<script>
import moment from "moment";
export default {
  props: {
    record: {
      type: Object,
      required: true
    }
  },
  computed: {
    date() {
      const date = moment(this.record.date, "DD MMM YYYY");
      if (moment().isSame(date, "days")) {
        return "Today";
      } else if (
        moment()
          .subtract(1, "days")
          .isSame(date, "days")
      ) {
        return "Yesterday";
      }
      return this.record.date;
    }
  }
};
</script>