<template>
  <v-card flat>
    <v-container class="px-5 py-0">
      <v-row>
        <v-col cols="auto" style="max-width:130px">
          <v-img :src="book.imageUrl" width="110px" height="180px"></v-img>
        </v-col>
        <v-col class="pa-3 pt-1">
          <v-card-title class="pa-0">
            <router-link
              class="link-inherit highlight"
              :to="{ name: 'book', params: { id: book.id } }"
            >
              {{ book.title }}
            </router-link>
          </v-card-title>
          <v-card-text class="pa-0 subtitle-1">
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
          <v-card-text class="pa-0 subtitle-1">
            Goodreads rating: {{ book.goodreadsRating }} &bull;
            {{ book.genres[0] }} &bull; Published in {{ book.publishedYear }}
          </v-card-text>
          <v-card-text
            v-if="book.description"
            class="subtitle-1 text-justify pa-0 pt-2"
            style="white-space: pre-line"
          >
            {{ shrinkedDescription }}
            <a
              @click="shrinked = !shrinked"
              v-if="splitDescription.length > this.showLength"
            >
              {{ expandLink }}</a
            ></v-card-text
          >
          <v-row align="start">
            <v-col cols="auto" class="pb-0" style="width:180px">
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
            </v-col>
            <v-col cols="auto" :class="$mq === 'xs' ? 'py-0' : ''">
              <v-row align="baseline">
                <v-col
                  :cols="$mq | mq({ xs: 12, sm: 'auto' })"
                  class="pa-0 pl-3"
                >
                  {{ book.userData.rating > 0 ? "Your rating:" : "Rate:" }}
                </v-col>
                <v-rating
                  size="20"
                  hover
                  :value="book.userData.rating"
                ></v-rating>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-dialog v-model="finishDialog" max-width="600">
        <bs-finish-dialog :book="book" @posted="finishBook"></bs-finish-dialog>
      </v-dialog>
      <slot></slot>
    </v-container>
  </v-card>
</template>

<script>
import shrinkDescription from "../../mixins/shrinkDescription";
import bookStatus from "../../mixins/bookStatus";
import FinishDialog from "./FinishBookDialog";
export default {
  data() {
    return {
      showLength: 12,
      finishDialog: false,
      statusTemp: null
    };
  },
  mixins: [shrinkDescription, bookStatus],
  components: { "bs-finish-dialog": FinishDialog },
  props: {
    book: {
      required: true,
      type: Object
    }
  },
  mounted() {
    this.statusTemp = this.book.userData.status;
    this.generateDescription(
      this.book.description,
      this.showLength,
      this.showLength
    );
  }
};
</script>
