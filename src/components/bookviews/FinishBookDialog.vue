<template>
  <v-dialog
    max-width="600"
    :value="dialog"
    @input="inp($event)"
    @click:outside="reset()"
  >
    <v-card>
      <v-form ref="form" v-model="formValid">
        <v-container>
          <v-card-title class="pb-0"
            >{{ book.title }} {{ getSeries }}
          </v-card-title>
          <v-card-text class="text-subtitle-1 pb-1">
            <span>by </span>
            <span
              v-for="(author, i) in book.authors"
              :key="i"
              v-text="
                i < book.authors.length - 1 ? `${author.name}, ` : author.name
              "
            ></span>
          </v-card-text>
          <v-divider></v-divider>
          <v-row class="px-3 pt-2">
            <v-col cols="auto" class="text-subtitle-1"> My rating: </v-col>
            <v-col cols="auto" class="pr-0 pl-0">
              <v-hover v-slot:default="{ hover }" v-for="i in 5" :key="i">
                <v-tooltip bottom color="#757575">
                  <template v-slot:activator="{ on }">
                    <v-icon
                      color="primary"
                      class="pl-1"
                      v-on="on"
                      @mouseover="hoverMe(i)"
                      @mouseleave="unhoverMe"
                      @click="clickMe"
                    >
                      {{
                        hover || hovered >= i ? "mdi-star" : "mdi-star-outline"
                      }}
                    </v-icon>
                  </template>
                  <span>{{ ratingValues[i - 1] }}</span>
                </v-tooltip>
              </v-hover>
            </v-col>
            <v-col class="pa-2">
              <v-btn text @click="clear">Clear</v-btn>
            </v-col>
          </v-row>
          <v-card-text class="text-subtitle-1 font-weight-regular px-3 py-2">
            What do you think?
          </v-card-text>

          <v-textarea
            v-model="notes"
            outlined
            auto-grow
            label="Write your notes, review, etc (optional)"
            class="px-3"
          ></v-textarea>
          <v-card-text class="py-0 text-subtitle-1">
            Reading dates (optional):
          </v-card-text>
          <v-row justify="space-between" class="pr-3 pl-3">
            <v-col cols="auto">
              <v-menu
                v-model="dialogMenu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="250px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    :value="formatDate(startDate)"
                    label="Start date "
                    prepend-icon="mdi-calendar-range"
                    autocomplete="off"
                    clearable
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="startDate"
                  no-title
                  @input="dialogMenu = false"
                >
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="auto">
              <v-menu
                v-model="dialogMenu2"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="250px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    :value="formatDate(endDate)"
                    label="End date"
                    prepend-icon="mdi-calendar-range"
                    autocomplete="off"
                    v-on="on"
                    clearable
                    :rules="[dateRules]"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="endDate"
                  no-title
                  @input="dialogMenu2 = false"
                >
                </v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-card-actions class="justify-end">
            <v-btn text @click="post">Submit</v-btn>
          </v-card-actions>
        </v-container>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from "moment";
export default {
  props: {
    book: {
      type: Object,
      required: true,
    },
    dialog: Boolean,
  },

  data() {
    return {
      formValid: false,
      notes: "",
      dialogMenu: false,
      dialogMenu2: false,
      startDate: new Date().toISOString().substr(0, 10),
      endDate: new Date().toISOString().substr(0, 10),
      ratingValues: [
        "Not worth",
        "Mediocre",
        "Okay book",
        "Good book",
        "Great book",
      ],
      dateRules: () => this.endDate >= this.startDate || "Enter correct date",
      hovered: 0,
      clicked: false,
      rating: 0,
    };
  },

  computed: {
    getSeries() {
      return this.book.series ? this.book.series.fullName : "";
    },
  },

  methods: {
    inp(event) {
      this.$emit("input", event);
    },

    formatDate(date) {
      return date ? moment(date).format("MMMM Do YYYY") : "";
    },

    hoverMe(i) {
      this.hovered = i;
    },

    unhoverMe() {
      if (this.clicked) {
        this.hovered = this.rating || 0;
      } else {
        this.hovered = 0;
      }
    },

    clickMe() {
      this.clicked = true;
      this.rating = this.hovered;
    },

    clear() {
      this.hovered = 0;
      this.clicked = false;
    },

    post() {
      if (this.$refs.form.validate()) {
        let post = this.book;
        this.book.userData.rating = this.rating;
        post.userData.notes = this.notes;
        post.userData.startDate = this.startDate;
        post.userData.endDate = this.endDate;
        this.$emit("posted", post);
      }
    },

    reset() {
      this.rating = this.book.userData.rating;
      this.hovered = this.rating;
      this.clicked = this.book.userData.rating > 0;
      this.notes = "";
    },
  },

  mounted() {
    this.reset();
  },
};
</script>
