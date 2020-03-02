<template>
  <v-card flat>
    <v-container class="pr-5 pl-5 pb-0 pt-0">
      <v-row>
        <v-col cols="auto" style="max-width:130px">
          <v-img
            :src="book.imageUrl"
            contain
            width="110px"
            height="180px"
          ></v-img>
        </v-col>
        <v-col class="pa-4">
          <v-card-title class="pa-0">
            <router-link
              class="link-inherit"
              :to="{ name: 'book', params: { id: book.id } }"
            >
              {{ book.title }}
            </router-link>
          </v-card-title>
          <v-card-text class="pa-0 subtitle-1">
            by
            <span
              v-for="(author, i) in book.authors"
              :key="i"
              v-text="
                i < book.authors.length - 1 ? `${author.name}, ` : author.name
              "
            ></span>
          </v-card-text>
          <v-card-text class="pa-0 subtitle-1">
            Goodreads rating: {{ book.goodreadsRating }} &bull;
            {{ book.genres[0] }} &bull; Published in {{ book.publishedYear }}
          </v-card-text>
          <v-card-text
            v-if="book.description"
            class="subtitle-1 text-justify pa-0"
            style="white-space: pre-line"
          >
            {{ shrinkedDescription }}
            <a
              @click="shrinked = !shrinked"
              v-if="splitDescription.length > 12"
            >
              {{ expandLink }}</a
            ></v-card-text
          >
          <v-row align="center">
            <v-col cols="auto">
              <v-menu offset-y>
                <template v-slot:activator="{ on: on }">
                  <v-btn v-on="on"
                    >Not Reading <v-icon right>mdi-chevron-down</v-icon></v-btn
                  ></template
                >
                <v-list>
                  <v-list-item>2Read</v-list-item>
                  <v-list-item>Reading</v-list-item>
                  <v-list-item>Stopped</v-list-item>
                  <v-list-item>Finished</v-list-item>
                </v-list>
              </v-menu>
            </v-col>
            <v-col cols="auto">
              <v-row align="baseline">
                <span
                  v-text="book.userData.rating > 0 ? 'Your rating:' : 'Rate:'"
                ></span>
                <v-rating size="20" hover></v-rating>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <slot></slot>
    </v-container>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      splitDescription: "",
      shrinked: true
    };
  },
  computed: {
    expandLink() {
      return this.shrinked ? "...more" : "less";
    },
    isShrinked() {
      return this.splitDescription.length > 12;
    },
    shrinkedDescription() {
      if (this.shrinked && this.splitDescription.length > 12) {
        let shortDesc = this.splitDescription;
        return shortDesc.slice(0, 12).join(" ");
      } else {
        return this.book.description;
      }
    }
  },
  props: {
    book: {
      required: true,
      type: Object
    }
  },
  mounted() {
    this.splitDescription = this.book.description.split(" ");
  }
};
</script>
