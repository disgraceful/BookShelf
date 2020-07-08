<template>
  <v-card flat>
    <v-container>
      <v-card-title class="py-0">User Feed</v-card-title>
      <bs-user-record v-for="index in records" :key="index" :record="index"></bs-user-record>
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
          text: "Finished Konan the Barbarian",
          link: "/book/12345"
        },
        1,
        2,
        3,
        4
      ]
    };
  }
};
</script>
