<template>
  <v-card flat>
    <v-row v-if="book" :justify="xs ? 'center' : 'start'">
      <v-col :cols="xs ? 12 : 'auto'" style="max-width: 140px">
        <bs-img :url="book.imageUrl" height="180"></bs-img>
      </v-col>
      <v-col class="py-2 px-3" :cols="xs ? 'auto' : ''">
        <v-card-title class="pa-0">
          <router-link
            class="link-inherit highlight"
            :to="{ name: 'book', params: { id: book.id } }"
          >
            {{ book.title }}
          </router-link>
        </v-card-title>
        <bs-author-links class="pa-0 text-subtitle-1" :authors="book.authors"></bs-author-links>
        <v-card-text class="pa-0 text-subtitle-1">
          Goodreads rating: {{ book.goodreadsRating }} &bull; {{ book.genres[0] }} &bull; Published
          in {{ book.publishedYear }}
        </v-card-text>
        <v-card-text
          v-if="book.description"
          class="text-subtitle-1 text-justify pa-0 pt-2"
          style="white-space: pre-line"
        >
          {{ shrinkedDescription }}
          <a @click="shrinked = !shrinked" v-if="splitDescription.length > this.showLength">
            {{ expandLink }}
          </a>
        </v-card-text>
        <v-row align="center" :justify="xs ? 'center' : 'start'">
          <v-col :cols="xs ? 12 : 'auto'" class="pb-0 mb-n3">
            <v-select
              style="max-width: 180px; margin: 0 auto"
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
          </v-col>
          <v-col
            v-if="book.userData.status !== 'not reading'"
            cols="auto"
            :class="xs ? 'py-0' : ''"
          >
            <v-row align="baseline" :justify="xs ? 'center' : 'start'">
              <v-col :cols="$mq | mq({ xs: 12, sm: 'auto' })" class="pa-0 pl-3 text-center">
                {{ book.userData.rating > 0 ? "Your rating:" : "Rate:" }}
              </v-col>
              <v-rating size="20" hover v-model="book.userData.rating" @input="update"></v-rating>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
      <bs-finish-dialog
        :dialog="finishDialog"
        :book="book"
        @input="input($event)"
        @posted="finishBook"
      ></bs-finish-dialog>
    </v-row>
    <v-divider v-if="book"></v-divider>
  </v-card>
</template>

<script>
import { ServiceFactory } from "../../services/serviceFactory";
import shrinkDescription from "../../mixins/shrinkDescription";
import bookStatus from "../../mixins/bookStatus";
import FinishDialog from "./FinishBookDialog";
import mediaQueryLogic from "../../mixins/mediaQueryLogic";
import AuthorLinksHelper from "../author/AuthorLinksHelper.vue";
import PlaceholderImg from "../shared/PlaceholderImg.vue";
const bookService = ServiceFactory.get("book");
const userService = ServiceFactory.get("user");

export default {
  mixins: [shrinkDescription, bookStatus, mediaQueryLogic],
  props: {
    id: {
      required: true,
      type: String,
    },
  },
  components: {
    "bs-finish-dialog": FinishDialog,
    "bs-author-links": AuthorLinksHelper,
    "bs-img": PlaceholderImg,
  },

  data() {
    return {
      book: null,
      showLength: 15,
      finishDialog: false,
      statusTemp: null,
    };
  },
  methods: {
    update() {
      userService.updateBook(this.book).catch((error) => {
        this.$emit("error", error.body);
      });
    },

    input(event) {
      this.finishDialog = event;
      this.statusTemp = this.book.userData.status;
    },
  },

  created() {
    bookService
      .getBookById(this.id)
      .then((response) => {
        this.book = response.body;
        this.statusTemp = this.book.userData.status;
        let description = this.book.description.replace("\n\n", "\n");
        this.generateDescription(description, this.showLength, this.showLength);
      })
      .catch((error) => this.$emit("error", error.body));
  },
};
</script>
