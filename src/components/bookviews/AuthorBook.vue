<template>
  <v-card flat>
    <v-row>
      <v-col cols="auto">
        <v-img :src="book.imageUrl" width="60" contain></v-img>
      </v-col>
      <v-col cols="4" md="5">
        <v-card-text class="pb-0 pt-0 subtitle-1">
          <router-link
            class="link-inherit highlight"
            :to="{ name: 'book', params: { id: book.id } }"
          >
            {{ book.title }}
          </router-link>
        </v-card-text>
        <v-card-text class="pb-0 body-2">
          by
          <router-link
            class="link-inherit highlight"
            v-for="(author, i) in book.authors"
            :key="i"
            :to="{ name: 'authors', params: { id: author.id } }"
            v-text="
              i < book.authors.length - 1 ? `${author.name}, ` : author.name
            "
          ></router-link>
        </v-card-text>
      </v-col>
      <v-col cols="auto">
        <v-row>
          <v-menu offset-y>
            <template v-slot:activator="{ on: on }">
              <v-btn v-on="on"
                >{{ book.userData.status }}
                <v-icon right>mdi-chevron-down</v-icon></v-btn
              ></template
            >
            <v-list>
              <v-list-item v-for="item in getAvaliableStatus" :key="item">{{
                item
              }}</v-list-item>
            </v-list>
          </v-menu>
        </v-row>
        <v-row class="pt-2" align="center">
          <span
            v-text="book.userData.rating > 0 ? 'Your rating:' : 'Rate:'"
          ></span>
          <v-rating size="20" hover :value="book.userData.rating"></v-rating>
        </v-row>
      </v-col>
    </v-row>
    <v-divider></v-divider>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      avaliableStatus: [
        "Not Reading",
        "Reading",
        "2Read",
        "Finished",
        "Stopped"
      ]
    };
  },
  computed: {
    getAvaliableStatus() {
      return this.avaliableStatus.filter(
        item => item.toLowerCase() !== this.book.userData.status
      );
    }
  },
  props: {
    book: {
      required: true,
      type: Object
    }
  }
};
</script>
