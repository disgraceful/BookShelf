<template>
  <v-card flat>
    <div class="d-flex flex-row justify-space-between align-baseline">
      <v-card-title class="pb-2 font-weight-regular">My Activity</v-card-title>
    </div>
    <v-divider></v-divider>
    <v-row class="px-4" align="baseline">
      <v-col class="py-0" cols="auto">
        <v-card-text class="text-subtitle-1 px-0 black--text">
          Reading history:
        </v-card-text>
      </v-col>
      <v-col>
        <v-timeline dense>
          <v-timeline-item
            class="pb-3"
            small
            color="teal"
            v-for="(times, i) in historyEntries"
            :key="i"
          >
            {{ formatDate(times.startDate) }} --
            {{ formatDate(times.endDate) }}
          </v-timeline-item>
          <v-timeline-item class="pb-3" small color="grey" v-if="toMuchHistory">
            <a
              class="highlight teal--text"
              @click="historyExpanded = !historyExpanded"
              >{{ historyLink }}
            </a>
          </v-timeline-item>
        </v-timeline>
      </v-col>
    </v-row>

    <v-card-text
      v-if="userData.notes && !reviewActive"
      class="pt-0 black--text text-subtitle-1"
      >My review: {{ userData.notes }}
    </v-card-text>
    <v-row class="px-4 mb-n8" v-if="reviewActive">
      <v-col :cols="smL ? 12 : 6">
        <v-textarea outlined auto-grow rows="3" v-model="userData.notes">
        </v-textarea>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="py-0" cols="auto">
        <v-btn text @click="editReview">{{ btnText }}</v-btn>
      </v-col>
      <v-col class="py-0" cols="auto" v-if="reviewActive">
        <v-btn text @click="reviewActive = false">Cancel</v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import moment from "moment";
import { ServiceFactory } from "../../services/serviceFactory";
import mediaQueryLogic from "../../mixins/mediaQueryLogic";
const userService = ServiceFactory.get("user");

export default {
  mixins: [mediaQueryLogic],
  props: {
    book: {
      required: true,
      type: Object,
    },
  },

  data() {
    return {
      userData: null,
      reviewActive: false,
      oldReview: "",
      historyExpanded: false,
    };
  },

  computed: {
    historyEntries() {
      return !this.historyExpanded
        ? this.userData.finishTimes.slice(0, 1)
        : this.userData.finishTimes;
    },

    toMuchHistory() {
      return this.userData.finishTimes.length > 1;
    },

    historyLink() {
      return this.historyExpanded ? "Show less" : "Show more";
    },

    btnText() {
      if (!this.reviewActive && this.userData.notes) return "Edit review";
      return this.reviewActive ? "Submit" : "Add Review";
    },
  },

  methods: {
    editReview() {
      this.reviewActive = true;
      if (this.userData.notes && this.userData.notes !== this.oldReview) {
        userService
          .updateBook(this.book)
          .then(() => {
            this.reviewActive = false;
            this.oldReview = this.userData.notes;
          })
          .catch((error) => this.$emit("error", error.body));
      }
    },

    formatDate(date) {
      return date ? moment(date).format("MMMM Do YYYY") : "";
    },
  },

  created() {
    this.userData = this.book.userData;
    this.oldReview = this.userData.notes;
  },
};
</script>
