<template>
  <router-link :to="{ name: 'book', params: { id: id } }" class="link-inherit highlight">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    id: { type: String, required: true },
  },

  computed: {
    routeParams() {
      return "";
    },
  },
};
</script>