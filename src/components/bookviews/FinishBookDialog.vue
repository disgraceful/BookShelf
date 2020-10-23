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
            v-model="book.userData.notes"
            outlined
            auto-grow
            label="Write your notes, review, etc (optional)"
            class="px-3 mb-n4"
          ></v-textarea>
          <v-card-text class="py-0 text-subtitle-1">
            Reading dates:
          </v-card-text>
          <v-row justify="space-between" class="px-3">
            <v-col cols="auto">
              <bs-time-picker
                :date="startDate"
                :rules="startDateRules"
                @input="startDate = $event"
                label="Start date"
                prependIcon
                clearable
              >
              </bs-time-picker>
            </v-col>
            <v-col cols="auto">
              <bs-time-picker
                :date="endDate"
                :rules="endDateRules"
                @input="endDate = $event"
                label="End date"
                prependIcon
                clearable
              >
              </bs-time-picker>
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
import TimePicker from "../shared/TimePicker";
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
    "bs-time-picker": TimePicker,
  },

  data() {
    return {
      formValid: false,
      startDate: new Date().toISOString().substr(0, 10),
      endDate: new Date().toISOString().substr(0, 10),
      ratingValues: [
        "Not worth",
        "Mediocre",
        "Okay book",
        "Good book",
        "Great book",
      ],
      errorMessage: "Something doesn't add up!",
      startDateRules: () => this.startDate <= this.endDate || this.errorMessage,
      endDateRules: () => this.endDate >= this.startDate || this.errorMessage,
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
        if (!post.userData.finishTimes) {
          post.userData.finishTimes = [];
        }
        post.userData.finishTimes.push({
          startDate: this.startDate,
          endDate: this.endDate,
        });
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
