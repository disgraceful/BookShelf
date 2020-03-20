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
        <v-row style="max-width:180px">
          <v-select
            dense
            background-color="teal"
            dark
            v-model="statusTemp"
            :items="avaliableStatus"
            item-text="text"
            item-value="status"
            :menu-props="{ offsetY: true }"
            solo
            @input="handleCollection(statusTemp)"
          ></v-select>
        </v-row>
        <v-row align="center" style="margin-top:-5px">
          <v-col class="text-center pa-0 ">
            {{ book.userData.rating > 0 ? "Your rating:" : "Rate:" }}
            <v-rating size="20" hover :value="book.userData.rating"></v-rating>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-dialog v-model="finishDialog" max-width="600">
      <bs-finish-dialog :book="book" @posted="finishBook"></bs-finish-dialog>
    </v-dialog>
  </v-card>
</template>

<script>
import bookStatus from "../../mixins/bookStatus";
import FinishDialog from "./FinishBookDialog";
export default {
  data() {
    return {
      statusTemp: null,
      finishDialog: false
    };
  },
  computed: {},
  mixins: [bookStatus],
  components: { "bs-finish-dialog": FinishDialog },
  props: {
    book: {
      required: true,
      type: Object
    }
  },
  mounted() {
    this.statusTemp = this.book.userData.status;
  }
};
</script>
