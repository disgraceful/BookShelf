<template>
  <v-card flat>
    <v-container class="py-0">
      <v-row>
        <v-col cols="auto">
          <v-img :src="book.imageUrl" width="70" height="110px"></v-img>
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
        <v-col :cols="$mq === 'xs' ? 12 : 'auto'">
          <v-row justify="center">
            <v-select
              style="max-width:180px"
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
          <v-row
            v-if="book.userData.status !== 'not reading'"
            align="center"
            style="margin-top:-10px"
          >
            <v-col class="text-center pa-0 ">
              {{ book.userData.rating > 0 ? "Your rating:" : "Rate:" }}
              <v-rating
                size="20"
                hover
                v-model="book.userData.rating"
                @input="update"
              ></v-rating>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-divider></v-divider>
    </v-container>
    <v-dialog v-model="finishDialog" max-width="600">
      <bs-finish-dialog :book="book" @posted="finishBook"></bs-finish-dialog>
    </v-dialog>
  </v-card>
</template>

<script>
import bookStatus from "../../mixins/bookStatus";
import bookLogic from "../../mixins/bookLogic";
import FinishDialog from "./FinishBookDialog";
export default {
  data() {
    return {
      statusTemp: null,
      finishDialog: false
    };
  },
  mixins: [bookStatus, bookLogic],
  components: { "bs-finish-dialog": FinishDialog },
  props: {
    book: {
      required: true,
      type: Object
    }
  },
 
  methods: {
    update() {
      this.updateBook();
    }
  },
  mounted() {
    this.statusTemp = this.book.userData.status;
  }
};
</script>
