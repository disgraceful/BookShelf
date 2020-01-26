<template>
  <v-container>
    <v-row align="center" justify="space-between">
      <v-col class="smallImg">
        <v-img :src="book.smallImageUrl" contain max-height="120"></v-img>
      </v-col>
      <v-col>
        <v-card-text class="pa-1 subtitle-1">
          {{ book.title }}
        </v-card-text>
        <v-card-text class="pa-1"> by {{ book.author.name }} </v-card-text>
      </v-col>
      <v-col auto>
        <v-rating medium v-model="book.rating" hover></v-rating>
      </v-col>
      <v-col cols="4">
        <v-row no-gutters="">
          <v-col>
            <div class="body-2">Pages read</div>
          </v-col>
          <v-col>
            <div class="text-end body-2">{{ pagesRead }}</div>
          </v-col>
        </v-row>
        <v-progress-linear :value="pages"></v-progress-linear>
      </v-col>
    </v-row>
    <slot></slot>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      pagesRead: 252
    };
  },
  props: ["book"],
  computed: {
    pages() {
      return (this.pagesRead / this.book.pages) * 100;
    }
  }
};
</script>

<style scoped>
.smallImg {
  flex-grow: 0 !important;
}

.progressBarText {
  display: flex;
}
</style>
