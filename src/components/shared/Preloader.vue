<template>
  <div :class="options.wrapperClass">
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
  props: {
    options: {
      type: Object,
      default: function() {
        return {
          isDetermined: true,
          color: "teal",
          size: "100",
          width: "10",
          wrapperClass: "loader-wrapper"
        };
      }
    }
  }
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
