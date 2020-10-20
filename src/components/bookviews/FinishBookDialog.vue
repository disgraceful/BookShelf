<template>
  <v-dialog
    :max-width="width"
    :value="dialog"
    @input="$emit('input', $event)"
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
            <span v-if="isPrivate">{{ book.authors }}</span>
            <template v-else>
              <span
                v-for="(author, i) in book.authors"
                :key="i"
                v-text="
                  i < book.authors.length - 1 ? `${author.name}, ` : author.name
                "
              ></span>
            </template>
          </v-card-text>
          <v-divider></v-divider>

          <v-row class="px-3 pt-2">
            <v-col cols="auto" class="text-subtitle-1"> My rating: </v-col>
            <v-col cols="auto" class="px-0">
              <bs-hover-rating
                :rating="rating"
                :values="ratingValues"
                :cleared="cleared"
                @input="rating = $event"
                ref="rating"
              ></bs-hover-rating>
            </v-col>
            <v-col class="pa-2">
              <v-btn text @click="cleared = true">Clear</v-btn>
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
import HoverRating from "../shared/HoverRating";
export default {
  props: {
    book: {
      type: Object,
      required: true,
    },
    dialog: Boolean,
    width: {
      type: Number,
      default: 600,
    },
  },

  components: {
    "bs-hover-rating": HoverRating,
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
      rating: 0,
      cleared: false,
    };
  },

  computed: {
    getSeries() {
      return this.book.series ? this.book.series.fullName : "";
    },

    isPrivate() {
      return !Array.isArray(this.book.authors);
    },
  },

  methods: {
    formatDate(date) {
      return date ? moment(date).format("MMMM Do YYYY") : "";
    },

    post() {
      if (this.$refs.form.validate()) {
        let post = this.book;
        this.book.userData.rating = this.rating;
        post.userData.pagesRead = this.book.pages;
        post.userData.notes = this.notes;
        post.userData.startDate = this.startDate;
        post.userData.endDate = this.endDate;
        this.$emit("posted", post);
      }
    },

    reset() {
      this.rating = this.book.userData.rating;
      this.cleared = false;
      this.notes = "";
    },
  },

  mounted() {
    this.reset();
  },
};
</script>
