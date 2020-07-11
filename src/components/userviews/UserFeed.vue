<template>
  <v-card flat>
    <v-container>
      <v-card-title class="py-0">User Feed</v-card-title>
      <bs-user-record v-for="record in records" :key="record.date" :record="record"></bs-user-record>
    </v-container>
  </v-card>
</template>

<script>
import UserRecord from "./UserRecord.vue";
export default {
  components: { "bs-user-record": UserRecord },
  data() {
    return {
      records: [
        {
          date: "01/02/2020",
          texts: ["Finished", "Stopped reading", "Will be reading"],
          books: [
            { name: "Konan the Barbarian", id: 12345 },
            { name: "The Book Example", id: 12345 },
            { name: "The PeePee", id: 12345 }
          ]
        },
        {
          date: "05/01/2020",
          texts: ["Read 100 pages of"],
          books: [{ name: "Sex in the City", id: 1234 }]
        }
      ]
    };
  }
};
</script>
