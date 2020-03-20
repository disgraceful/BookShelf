<template>
  <div :class="getWrapperClass">
    <v-progress-circular
      :indeterminate="options.isDetermined"
      :color="options.color"
      :size="options.size"
      :width="options.width"
    ></v-progress-circular>
  </div>
</template>
<script>
export default {
  data() {
    return {
      defaultClass: "loader-wrapper"
    };
  },
  computed: {
    getWrapperClass() {
      return this.options.wrapperClass
        ? this.options.wrapperClass
        : this.defaultClass;
    }
  },
  props: { options: { type: Object, required: true } }
};
</script>

<style scoped>
.loader-wrapper {
  display: flex;
  position: relative;
  top: 240px;
  justify-content: center;
  padding-bottom: 2rem;
}
</style>
