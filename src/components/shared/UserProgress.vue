<template>
  <v-card flat class="progress" :style="{ backgroundColor: progress.bgcolor }">
    <div class="progress-text">
      <v-card-text class="display-3 pb-0 font-weight-regular">{{
        progress.value
      }}</v-card-text>
      <v-card-text class="title text-lowercase pt-0 font-weight-regular">{{
        progress.text
      }}</v-card-text>
    </div>
    <div class="filler" :style="fillerStyle"></div>
  </v-card>
</template>

<script>
export default {
  props: {
    progress: {
      type: Object,
      required: true
    }
  },
  computed: {
    fillHeight() {
      return (this.progress.value / this.progress.max) * 100;
    },
    fillerStyle() {
      return {
        height: `${this.fillHeight}%`,
        backgroundColor: this.progress.color
      };
    }
  }
};
</script>

<style scoped>
.progress {
  margin-right: 4.5rem;
  width: 200px;
  height: 200px;
  min-height: 100px;
  min-width: 100px;
  position: relative !important;
}

.progress-text {
  padding-top: 20%;
  position: relative;
  color: #fff;
  z-index: 33;
  text-align: center;
}

.filler {
  position: absolute;
  width: 100%;
  bottom: 0;
}
</style>
