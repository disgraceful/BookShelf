<template>
  <v-card>
    <v-container class="px-7">
      <v-card-title class="px-0 text-uppercase">Upload private book</v-card-title>
      <v-form ref="form" v-model="valid" lazy-validation>
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
        <v-text-field label="Title" v-model="title" :rules="titleRules"></v-text-field>
        <v-text-field label="Author" v-model="author" :rules="authorRules"></v-text-field>
        <v-text-field label="Pages" v-model="pages" :rules="pagesRules" type="number"></v-text-field>
        <v-textarea
          label="Book description"
          v-model.number="description"
          clearable
          rows="1"
          counter="200"
          auto-grow
          :rules="descriptionRules"
        ></v-textarea>
        <v-row justify="end">
          <v-col cols="auto">
            <v-btn :disabled="!formValid" @click="upload">Upload</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </v-card>
</template>

<script>
import uploadService from "../../services/uploadService";
export default {
  data() {
    return {
      valid: false,
      title: "",
      author: "",
      pages: "",
      description: "",
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
    },
    formValid() {
      return (
        this.title !== "" && this.author !== "" && +this.pages > 0 && this.valid
      );
    }
  },
  methods: {
    upload() {
      let data = new FormData();
      data.append("title", this.title);
      data.append("author", this.author);
      data.append("pages", this.pages);
      data.append("description", this.description);
      data.append("cover", this.cover || this.defaultImg);
      uploadService.uploadBook(data).then(response => console.log(response));
    }
  }
};
</script>

