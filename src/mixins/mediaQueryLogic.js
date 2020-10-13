export default {
  computed: {
    lg() {
      return this.$mq === "lg";
    },
    md() {
      return this.$mq === "md";
    },
    sm() {
      return this.$mq === "sm";
    },
    xs() {
      return this.$mq === "xs";
    },
    mdH() {
      return this.$mq === "md" || this.$mq === "lg";
    },
    smL() {
      return this.$mq === "sm" || this.$mq === "xs";
    },
  },
};
