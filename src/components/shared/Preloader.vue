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
  props: { options: Object }
};
</script>
