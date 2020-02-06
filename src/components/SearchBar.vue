<template>
  <v-col
    sm6
    md3
    align-self="center"
    class="pb-0 pr-0 pl-0 search-bar"
    :style="{ top: searchActive ? '146px' : 0 }"
  >
    <div v-click-outside="clearSearch">
      <v-text-field
        ref="search"
        id="search"
        dense
        outlined
        label="Search books"
        v-model="searchQuery"
        autocomplete="off"
        @focus="visibleResults = true"
      >
        <template v-slot:append>
          <v-progress-circular
            v-if="loading"
            size="24"
            color="white"
            indeterminate
          ></v-progress-circular>
          <v-icon v-else>mdi-magnify</v-icon>
        </template>
      </v-text-field>

      <v-list
        class="search-results pa-0"
        light
        :style="{ visibility: visibleResults ? 'visible' : 'hidden' }"
      >
        <template v-for="(item, index) in searchResults">
          <v-divider :key="index"></v-divider>
          <v-list-item
            :key="item.title"
            :to="{ name: 'book', params: { id: item.id } }"
          >
            <v-list-item-avatar tile height="56px" width="46px">
              <v-img :src="item.smallImageUrl"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title
                v-text="`${item.title} ${item.seriesTitle}`"
              ></v-list-item-title>
              <v-list-item-subtitle
                v-text="`by ${item.authorName}`"
              ></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </div>
  </v-col>
</template>

<script>
import { ServiceFactory } from "../services/serviceFactory";
import { fromEvent, from, Subject } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  flatMap,
  takeUntil
} from "rxjs/operators";
const bookService = ServiceFactory.get("book");

export default {
  data() {
    return {
      searchQuery: "",
      searchResults: [],
      loading: false,
      destroyed$: new Subject(),
      visibleResults: true
    };
  },
  computed: {
    searchActive() {
      return this.searchResults.length > 0;
    },
    user() {
      return this.$store.getters.getAuthUser;
    }
  },
  watch: {
    $route() {
      this.searchQuery = "";
      this.searchResults = [];
    }
  },
  methods: {
    clearSearch() {
      if (this.searchActive) {
        this.visibleResults = false;
      }
    }
  },
  mounted() {
    const input$ = fromEvent(this.$refs.search.$refs.input, "input");
    input$
      .pipe(
        takeUntil(this.destroyed$),
        debounceTime(500),
        distinctUntilChanged(),
        map(input => input.target.value),
        flatMap(text => {
          this.loading = true;
          console.log("loading");
          return from(bookService.searchBook(text, this.user.token));
        })
      )
      .subscribe(
        response => {
          this.loading = false;
          console.log("finished");
          this.searchResults = response.slice(0, 4);
        },
        error => {
          console.error(error);
          this.loading = false;
          this.searchResults = [];
        }
      );
  },
  beforeDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
};
</script>

<style scoped>
.search-bar {
  min-width: 280px !important;
  padding-top: 1.5rem;
  position: relative;
}
.search-results {
  position: relative !important;
  top: -27px;
  z-index: 9999;
}
</style>
