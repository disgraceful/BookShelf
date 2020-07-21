<template>
  <v-card flat>
    <v-row align="baseline" class="px-2">
      <v-col>
        <v-card-text class="pl-8 py-1 text-h6 font-weight-regular">{{date}}</v-card-text>
      </v-col>
      <v-col cols="9">
        <v-card-text
          class="py-1 text-subtitle-1"
          v-for="(record,index) in record.value"
          :key="index"
        >
          {{record.message}}
          <router-link :to="{name:'book', params:{id:record.data.id} }">{{record.data.title}}</router-link>
        </v-card-text>
      </v-col>
    </v-row>
    <slot></slot>
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