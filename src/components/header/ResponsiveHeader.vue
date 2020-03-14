<template>
  <v-card class="toolbar-wrapper">
    <bs-lg-header v-if="$mq === 'lg'"></bs-lg-header>
    <bs-md-header v-if="$mq === 'md'"></bs-md-header>
    <bs-sm-header v-if="$mq === 'sm'"></bs-sm-header>
  </v-card>
</template>

<script>
import LargeHeader from "./LargeHeader";
import MediumHeader from "./MediumHeader";
import SmallHeader from "./SmallHeader";
export default {
  components: {
    "bs-lg-header": LargeHeader,
    "bs-md-header": MediumHeader,
    "bs-sm-header": SmallHeader
  }
};
</script>

<style>
.toolbar-wrapper.v-card {
  background-color: #009688 !important;
  border-bottom: 5px #004d40 solid !important;
  z-index: 50;
}

.title-icon {
  margin-right: 1rem !important;
}

.link-wrapper {
  display: flex;
  align-items: center;
}

.link-wrapper > .v-btn {
  height: 100% !important;
}
</style>
