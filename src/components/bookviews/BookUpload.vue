<template>
  <v-card>
    <v-dialog v-model="dialog" persistent max-width="700">
      <v-card>
        <v-container class="px-7">
          <v-card-title class="px-0 text-uppercase">Upload private book</v-card-title>
          <v-form lazy-validation v-model="valid">
            <v-row justify="start">
              <v-col cols="auto">
                <v-img :src="imgPath" max-height="200px" width="150px" contain></v-img>
              </v-col>
            </v-row>
            <v-file-input
              label="Upload book cover"
              v-model="cover"
              clearable
              chips
              :rules="imgRules"
              accept="image/*"
            ></v-file-input>
            <v-text-field label="Title" clearable required :rules="titleRules"></v-text-field>
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
                <v-btn :disabled="!valid">Upload</v-btn>
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
      cover: null,
      defaultImg: require("../../assets/goodreads.png"),
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
        value => (value && value > 0) || "Enter correct page count"
      ]
    };
  },
  computed: {
    imgPath() {
      return this.cover && this.cover.size > 0
        ? URL.createObjectURL(this.cover)
        : this.defaultImg;
    }
  }
};
</script>

