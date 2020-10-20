export default {
  data() {
    return {
      fullDescription: "",
      splitDescription: "",
      shrinked: true,
      showLength: 0,
      maxShowLength: 0,
    };
  },
  computed: {
    expandLink() {
      return this.shrinked ? "more" : "less";
    },
    isShrinked() {
      return this.splitDescription.length > this.maxShowLength;
    },
    shrinkedDescription() {
      if (this.shrinked && this.splitDescription.length > this.maxShowLength) {
        let shortDesc = this.splitDescription;
        return shortDesc.slice(0, this.showLength).join(" ") + "...";
      } else {
        return this.fullDescription;
      }
    },
  },
  methods: {
    generateDescription(description, showLength, maxShowLength) {
      this.fullDescription = description;
      this.splitDescription = description.split(" ");
      this.showLength = showLength;
      this.maxShowLength = maxShowLength;
    },
  },
};
