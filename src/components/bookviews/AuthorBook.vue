<template>
  <v-card flat>
    <v-row class="pl-3 py-0">
      <v-col cols="auto">
        <v-img :src="book.imageUrl" width="70" contain></v-img>
      </v-col>
      <v-col>
        <v-card-text class="pa-0 subtitle-1 font-weight-medium ">
          <router-link
            class="link-inherit highlight"
            :to="{ name: 'book', params: { id: book.id } }"
          >
            {{ book.title }} {{ book.series ? book.series.fullName : "" }}
          </router-link>
        </v-card-text>
        <v-card-text class="pa-0 pt-1 body-2">
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
        <v-card-text class="pa-0">
          Goodreads rating: {{ book.goodreadsRating }} &bull; Published in
          {{ book.publishedYear }}
        </v-card-text>
      </v-col>
      <v-col cols="auto">
        <v-row justify="center">
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
        <v-row class="pt-2" align="center" justify="center" no-gutters>
          <v-col>
            <div
              class="text-center"
              v-text="book.userData.rating > 0 ? 'Your rating:' : 'Rate:'"
            ></div>
            <v-rating size="20" hover :value="book.userData.rating"></v-rating>
          </v-col>
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
