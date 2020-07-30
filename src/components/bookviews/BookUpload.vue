<template>
  <v-card class="full-page">
    <v-dialog v-model="dialog" persistent max-width="700">
      <v-card>
        <v-container class="px-7">
          <v-card-title class="px-0 text-uppercase">Upload private book</v-card-title>
          <v-form lazy-validation v-model="valid">
            <v-row justify="start">
              <v-col cols="auto">
                <v-img src="../../assets/goodreads.png" width="150px" contain></v-img>
              </v-col>
            </v-row>
            <v-file-input label="Upload book cover" clearable chips :rules="imgRules"></v-file-input>
            <v-text-field label="Book title" clearable required :rules="titleRules"></v-text-field>
            <v-text-field label="Author" clearable required :rules="authorRules"></v-text-field>
            <v-text-field label="Pages" clearable required :rules="pagesRules" type="number"></v-text-field>
            <v-textarea
              label="Book description"
              clearable
              rows="1"
              counter="200"
              auto-grow
              :rules="descriptionRules"
            ></v-textarea>
            <v-row justify="end">
              <v-col cols="auto">
                <v-btn>Cancel</v-btn>
              </v-col>
              <v-col cols="auto">
                <v-btn>Upload</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      dialog: true,
      valid: true,
      imgRules: [
        value =>
          !value ||
          value.type.includes("image") ||
          "Please upload valid image file!"
      ],
      titleRules: [value => !!value || "Book title is required"],
      authorRules: [value => !!value || "Author name is required"],
      descriptionRules: [
        // i do this degeneracy because for some bizzare reason (value && value.length) returns undefined unless i check value first
        value => {
          if (value) {
            if (value.length > 200) return "200 symbols maximum";
          }
          return true;
        }
      ],
      pagesRules: [
        value => !!value || "Page count is required",
        value => (value && value <= 0) || "Enter correct page count"
      ]
    };
  }
};
</script>

<style>
.full-page {
  height: 100vh;
}
</style>