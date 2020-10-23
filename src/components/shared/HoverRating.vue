<template>
  <div>
    <v-hover v-slot:default="{ hover }" v-for="i in values.length" :key="i">
      <v-tooltip bottom color="#757575">
        <template v-slot:activator="{ on }">
          <v-icon
            color="primary"
            class="pl-1"
            v-on="on"
            @mouseover="hoverMe(i)"
            @mouseleave="unhoverMe"
            @click="clickMe"
          >
            {{ hover || hovered >= i ? "mdi-star" : "mdi-star-outline" }}
          </v-icon>
        </template>
        <span>{{ values[i - 1] }}</span>
      </v-tooltip>
    </v-hover>
  </div>
</template>

<script>
export default {
  props: {
    rating: Number,
    values: Array,
    cleared: Boolean,
  },

  data() {
    return {
      hovered: 0,
      clicked: false,
      selected: this.rating,
    };
  },

  watch: {
    rating() {
      this.reset();
    },

    cleared(val) {
      if (val) {
        this.clicked = false;
        this.hovered = 0;
      } else {
        this.reset();
      }
    },
  },

  methods: {
    hoverMe(i) {
      this.hovered = i;
    },

    unhoverMe() {
      if (this.clicked) {
        this.hovered = this.selected || 0;
      } else {
        this.hovered = 0;
      }
    },

    clickMe() {
      this.clicked = true;
      this.selected = this.hovered;
      this.$emit("input", this.selected);
    },

    reset() {
      this.selected = this.rating;
      this.hovered = this.selected;
      this.clicked = this.rating > 0;
    },
  },

  created() {
    this.reset();
  },
};
</script>
