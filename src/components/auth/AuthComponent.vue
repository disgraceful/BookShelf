<template>
  <v-container>
    <v-row>
      <v-col offset-md="3" md="6" sm="8" offset-sm="2">
        <v-card>
          <v-container>
            <slot name="title"></slot>
            <v-container>
              <v-row justify="center" class="py-2">
                <v-col cols="auto" class="pb-2">
                  <bs-google-signin :text="loginInfo"></bs-google-signin>
                </v-col>
                <v-col cols="auto" class="pb-2">
                  <bs-twitter-signin :text="loginInfo"></bs-twitter-signin>
                </v-col>
              </v-row>
              <v-card-text class="body-1 pt-0 px-1" v-if="loading && provider !== 'email'">
                You will be redirected to the application now
              </v-card-text>
              <v-divider></v-divider>
            </v-container>

            <v-form ref="form" v-model="valid">
              <v-col class="pt-0">
                <v-text-field
                  name="email"
                  label="Mail"
                  id="email"
                  v-model="email"
                  type="email"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>
              <v-col class="pt-0">
                <v-text-field
                  name="password"
                  label="Password"
                  id="password"
                  v-model="password"
                  :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPwd ? 'text' : 'password'"
                  :rules="[rules.required, rules.length]"
                  @click:append="showPwd = !showPwd"
                ></v-text-field>
              </v-col>
              <v-col v-if="error">
                <app-alert :message="error.message" @dismissed="dismissError"></app-alert>
              </v-col>
              <v-row justify="end">
                <v-col class="pt-0" cols="auto">
                  <v-btn
                    class="mr-3 text-capitalize"
                    :loading="loading && provider === 'email'"
                    @click="submit()"
                  >
                    {{ loginInfo }}
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { retryWhen } from "rxjs/operators";
import Alert from "../shared/Alert";
import GoogleSignInVue from "../shared/GSignIn";
import TwitterSignInVue from "../shared/TwitterSignIn.vue";
export default {
  components: {
    "app-alert": Alert,
    "bs-google-signin": GoogleSignInVue,
    "bs-twitter-signin": TwitterSignInVue,
  },

  props: {
    loginInfo: String,
    onSubmit: {
      type: Function,
      required: true,
    },
  },

  data() {
    return {
      valid: false,
      email: "",
      password: "",
      showPwd: false,
      rules: {
        required: (value) => !!value || "Field is required",
        length: (value) => value.length >= 6 || "Passwords must be 6 characters or longer",
      },
    };
  },

  computed: {
    user() {
      return this.$store.getters.getAuthUser;
    },

    error() {
      return this.$store.getters.getError;
    },

    loading() {
      return this.$store.getters.getLoading;
    },

    provider() {
      return this.$store.getters.getProvider;
    },
  },

  watch: {
    user(value) {
      if (value) {
        this.$router.push("/");
      }
    },
  },

  methods: {
    validate() {
      return this.$refs.form.validate();
    },

    submit() {
      if (this.validate()) {
        this.onSubmit(this.email, this.password);
      }
    },

    onFailure(error) {
      console.log(error);
    },

    dismissError() {
      this.$store.dispatch("clearError");
    },
  },

  created() {
    this.$store.dispatch("logOutUser");
    this.$store.dispatch("clearError");
  },
};
</script>
