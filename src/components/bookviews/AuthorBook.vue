<template>
  <v-card flat>
    <v-row>
      <v-col cols="auto">
        <v-img :src="book.imageUrl" width="80" height="120px"></v-img>
      </v-col>
      <v-col>
        <v-card-text class="pa-0 text-subtitle-1 font-weight-medium">
          <router-link
            class="link-inherit highlight"
            :to="{ name: 'book', params: { id: book.id } }"
          >
            {{ book.title }} {{ book.series ? book.series.fullName : "" }}
          </router-link>
        </v-card-text>
        <bs-author-links class="pa-0 pt-1 text-body-2" :authors="book.authors">
        </bs-author-links>
        <v-card-text class="pa-0">
          Goodreads rating: {{ book.goodreadsRating }} &bull; Published in
          {{ book.publishedYear }}
        </v-card-text>
      </v-col>
      <v-col :cols="xs ? 12 : 'auto'" :class="smL ? 'pb-0' : ''">
        <v-row justify="center">
          <v-select
            style="max-width: 180px"
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
          style="margin-top: -10px"
        >
          <v-col class="text-center pa-0 pb-2">
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
    <bs-finish-dialog
      :dialog="finishDialog"
      :book="book"
      @input="finishDialog = $event"
      @posted="finishBook"
    ></bs-finish-dialog>
  </v-card>
</template>

<script>
import bookStatus from "../../mixins/bookStatus";
import mediaQuery from "../../mixins/mediaQueryLogic";
import FinishDialog from "./FinishBookDialog";
import AuthorLinks from "../author/AuthorLinksHelper";
import { ServiceFactory } from "../../services/serviceFactory";
const userService = ServiceFactory.get("user");

export default {
  mixins: [bookStatus, mediaQuery],
  props: {
    book: {
      required: true,
      type: Object,
    },
  },
  components: {
    "bs-finish-dialog": FinishDialog,
    "bs-author-links": AuthorLinks,
  },

  data() {
    return {
      statusTemp: null,
      finishDialog: false,
      error: null,
    };
  },

  methods: {
    update() {
      userService.updateBook(this.book).catch((error) => {
        this.$emit("error", error.body);
      });
    },
  },

  mounted() {
    this.statusTemp = this.book.userData.status;
  },
};
</script>
