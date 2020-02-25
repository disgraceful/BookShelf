<template>
  <v-card> </v-card>
</template>

<script>
export default {
  props: {
    id: {
      required: true,
      type: String
    }
  },
  created() {
    console.log(this.id);
  }
};
</script>
