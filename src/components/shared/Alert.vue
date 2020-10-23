<template>
  <v-alert border="top" color="red" colored-border dense dismissible @input="onClose">
    {{ message }}
  </v-alert>
</template>

<script>
export default {
  props: ["message"],
  methods: {
    onClose() {
      this.$emit("dismissed");
    },
  },
};
</script>
