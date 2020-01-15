<template>
  <v-col
    sm6
    md3
    align-self="center"
    class="pb-0 pr-0 pl-0 search-bar"
    :style="{ top: searchActive ? '146px' : 0 }"
  >
    <v-text-field
      ref="search"
      id="search"
      dense
      outlined
      label="Search books"
      v-model="searchQuery"
      append-icon="mdi-magnify"
    ></v-text-field>

    <v-list class="search-results pa-0" light>
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
  </v-col>
</template>

<script>
import { fromEvent, from, Subject } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  flatMap,
  takeUntil
} from "rxjs/operators";

export default {
  data() {
    return {
      searchQuery: "",
      searchResults: [],
      destroyed$: new Subject()
    };
  },
  computed: {
    searchActive() {
      return this.searchResults.length > 0;
    }
  },
  watch: {
    $route() {
      this.searchQuery = "";
      this.searchResults = [];
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
        flatMap(text =>
          from(this.$http.get("books/search", { params: { search: text } }))
        )
      )
      .subscribe(
        response => {
          this.searchResults = response.body.slice(0, 4);
        },
        error => {
          console.error(error);
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
  position: relative;
  top: -27px;
}
</style>
