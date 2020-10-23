<template>
  <v-col class="search-wrapper">
    <div v-click-outside="clearSearch">
      <v-text-field
        ref="search"
        class="search-bar"
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
          <v-icon v-else @click="minimize">mdi-magnify</v-icon>
        </template>
      </v-text-field>

      <v-list
        class="search-results pa-0"
        light
        :style="{ visibility: visibleResults ? 'visible' : 'hidden' }"
      >
        <template v-if="error">
          <v-list-item>{{ error }}</v-list-item>
          <v-divider></v-divider>
        </template>
        <template v-else v-for="(item, index) in searchResults">
          <v-list-item
            :key="item.title"
            :to="{
              name: 'book',
              params: { id: item.id, search: 'true' },
            }"
          >
            <v-list-item-avatar tile height="60" width="40">
              <bs-img :url="item.imageUrl" height="60" width="45"></bs-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title
                >{{ item.title }} {{ item.series }}</v-list-item-title
              >
              <v-list-item-subtitle
                v-text="`by ${item.author}`"
              ></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider :key="index"></v-divider>
        </template>
      </v-list>
    </div>
  </v-col>
</template>

<script>
import ClickOutside from "vue-click-outside";
import { ServiceFactory } from "../../../services/serviceFactory";
import { fromEvent, from, Subject, of } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  flatMap,
  takeUntil,
  catchError,
} from "rxjs/operators";
import PlaceholderImg from "../../shared/PlaceholderImg.vue";
const bookService = ServiceFactory.get("book");

export default {
  components: { "bs-img": PlaceholderImg },
  data() {
    return {
      searchQuery: "",
      searchResults: [],
      loading: false,
      destroyed$: new Subject(),
      visibleResults: true,
      error: null,
    };
  },
  computed: {
    searchActive() {
      return this.searchResults.length > 0 && this.searchQuery.length > 0;
    },
  },
  watch: {
    $route() {
      this.searchQuery = "";
      this.searchResults = [];
    },
  },
  methods: {
    clearSearch() {
      this.visibleResults = false;
    },
    minimize() {
      this.$emit("minimized");
    },
  },
  directives: { ClickOutside },
  mounted() {
    const input$ = fromEvent(this.$refs.search.$refs.input, "input");
    input$
      .pipe(
        takeUntil(this.destroyed$),
        debounceTime(500),
        distinctUntilChanged(),
        map((input) => input.target.value),
        flatMap((text) => {
          if (text) {
            this.loading = true;
            this.error = null;
            return from(bookService.searchBook(text));
          } else {
            return of([]);
          }
        }),
        catchError((error, curThread) => {
          this.loading = false;
          this.error = "Book not found";
          this.searchResults = [];
          return curThread;
        })
      )
      .subscribe((response) => {
        this.loading = false;
        if (response.body && response.body.length > 0) {
          this.searchResults = response.body.slice(0, 4);
        } else {
          this.searchResults = [];
        }
      });
  },
  beforeDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  },
};
</script>

<style scoped>
.search-bar {
  position: absolute;
  top: 0;
  width: 100%;
}
.search-wrapper {
  min-width: 190px !important;
  max-width: 330px;
  margin-left: -0.8rem;
  padding-top: 1.5rem;
  margin-right: 0.5rem;
  position: relative;
}
.search-results {
  position: absolute !important;
  width: 100%;
  margin-top: 14px;
}
</style>
