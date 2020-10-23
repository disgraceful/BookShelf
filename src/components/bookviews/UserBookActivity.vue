<template>
  <v-card flat>
    <div class="d-flex flex-row justify-space-between align-baseline">
      <v-card-title class="pb-2 font-weight-regular">My Activity</v-card-title>
    </div>
    <v-divider></v-divider>
    <v-form ref="form">
      <v-row class="px-4" align="baseline">
        <v-col class="py-0" cols="auto">
          <v-card-text class="text-subtitle-1 px-0 black--text">
            Reading history:
          </v-card-text>
        </v-col>
        <v-col cols="auto">
          <v-timeline dense>
            <v-timeline-item
              :class="editActive ? 'pb-0' : 'pb-3'"
              small
              color="teal"
              v-for="(times, i) in historyEntries"
              :key="i"
            >
              <v-row align="center">
                <v-col cols="auto" class="py-0" style="max-width: 180px">
                  <bs-time-picker
                    v-if="editActive"
                    :date="times.startDate"
                    :rules="
                      startDateRules.call(this, formatDate(times.endDate))
                    "
                    @input="times.startDate = $event"
                  ></bs-time-picker>
                  <template v-else>
                    {{ formatDate(times.startDate) }}
                  </template>
                </v-col>
                <v-col cols="auto" class="py-0"> – </v-col>
                <v-col cols="auto" class="py-0" style="max-width: 180px">
                  <bs-time-picker
                    v-if="editActive"
                    :date="times.endDate"
                    :rules="
                      endDateRules.call(this, formatDate(times.startDate))
                    "
                    @input="times.endDate = $event"
                  ></bs-time-picker>
                  <template v-else>
                    {{ formatDate(times.endDate) }}
                  </template>
                </v-col>
              </v-row>
            </v-timeline-item>
            <v-timeline-item small color="grey" v-if="toMuchHistory">
              <a
                class="highlight teal--text"
                @click="historyExpanded = !historyExpanded"
                >{{ historyLink }}
              </a>
            </v-timeline-item>
          </v-timeline>
        </v-col>
        <v-col cols="auto" v-if="!editActive">
          <v-btn
            text
            @click="
              editActive = true;
              historyExpanded = true;
            "
            >Edit</v-btn
          >
        </v-col>
        <template v-else>
          <v-col cols="auto">
            <v-btn text @click="saveEdit">Save</v-btn>
          </v-col>
          <v-col cols="auto" class="px-0">
            <v-btn
              text
              @click="
                editActive = false;
                historyExpanded = false;
              "
              >Cancel</v-btn
            >
          </v-col>
        </template>
      </v-row>
    </v-form>

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
        <v-btn text @click="editReview">{{ reviewBtnText }}</v-btn>
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
import TimePickerVue from "../shared/TimePicker.vue";
const userService = ServiceFactory.get("user");

export default {
  mixins: [mediaQueryLogic],
  props: {
    book: {
      required: true,
      type: Object,
    },
  },
  components: {
    "bs-time-picker": TimePickerVue,
  },

  data() {
    return {
      userData: null,
      reviewActive: false,
      editActive: false,
      oldReview: "",
      historyExpanded: false,
      errorMessage: "Something doesn't add up!",
      startDateRules: (endDate) => {
        return (value) => value <= endDate || this.errorMessage;
      },
      endDateRules: (startDate) => {
        return (value) => value >= startDate || this.errorMessage;
      },
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

    reviewBtnText() {
      if (!this.reviewActive && this.userData.notes) return "Edit review";
      return this.reviewActive ? "Submit" : "Add Review";
    },

    editBtnText() {
      return this.editActive ? "Save" : "Edit";
    },
  },

  methods: {
    saveEdit() {
      if (this.editActive && this.$refs.form.validate()) {
        userService
          .updateBook(this.book)
          .then(() => {
            this.editActive = false;
            this.timesChanged = false;
          })
          .catch((error) => this.$emit("error", error.body));
      }
    },

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
