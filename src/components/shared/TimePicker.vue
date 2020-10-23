<template>
  <v-menu
    v-model="dialogMenu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    min-width="250px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        :value="formatDate()"
        :label="label"
        :prepend-icon="prependIcon ? 'mdi-calendar-range' : ''"
        :rules="[dateRules, rules]"
        autocomplete="off"
        :clearable="clearable"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker v-model="cmpDate" no-title @input="closeDialog"></v-date-picker>
  </v-menu>
</template>

<script>
import moment from "moment";
export default {
  props: {
    date: String,
    label: { type: String, default: "" },
    prependIcon: Boolean,
    clearable: Boolean,
    rules: Function,
  },

  data() {
    return {
      cmpDate: "",
      dialogMenu: false,
      dateRules: (value) => !!value || "Please enter date",
    };
  },

  methods: {
    closeDialog() {
      this.dialogMenu = false;
      this.$emit("input", this.cmpDate);
    },

    formatDate() {
      return this.cmpDate ? moment(this.cmpDate).format("MMMM Do YYYY") : "";
    },
  },

  created() {
    this.cmpDate = this.date;
  },
};
</script>
