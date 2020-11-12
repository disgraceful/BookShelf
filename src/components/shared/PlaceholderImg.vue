<template>
  <v-img :src="url" :width="width" :height="height" class="elevation-1">
    <template v-slot:placeholder>
      <slot name="placeholder"></slot>

      <v-row v-if="!hasSlot" class="fill-height ma-0" align="center" justify="center">
        <v-progress-circular indeterminate color="grey lighten-2"></v-progress-circular>
      </v-row>
    </template>
  </v-img>
</template>

<script>
export default {
  props: {
    url: { type: String, required: true },
    width: { type: [Number, String], default: 60 },
    height: { type: [Number, String], default: 100 },
  },

  computed: {
    hasSlot() {
      return !!this.$slots.placeholder;
    },
  },
};
</script>
