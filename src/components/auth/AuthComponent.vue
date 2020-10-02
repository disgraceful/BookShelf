<template>
  <v-container>
    <v-row>
      <v-col offset-md="3" md="6" sm="8" offset-sm="2">
        <v-card>
          <v-container>
            <v-card-title>{{ loginInfo }} </v-card-title>
            <v-col class="py-0">
              <v-divider></v-divider>
            </v-col>
            <v-card-text>Sign in with:</v-card-text>
            <v-row justify="center">
              <v-col cols="auto" class="py-0">
                <bs-signin :signInFnc="signInWithGoogle"></bs-signin>
              </v-col>
            </v-row>
            <v-form ref="form" v-model="valid">
              <v-col>
                <v-flex xs12>
                  <v-text-field
                    name="email"
                    label="Mail"
                    id="email"
                    v-model="email"
                    type="email"
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-flex>
              </v-col>
              <v-col>
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
                <app-alert
                  :message="error.message"
                  @dismissed="dismissError"
                ></app-alert>
              </v-col>
              <v-col>
                <v-flex xs12>
                  <v-btn
                    class="mr-3"
                    :loading="loading"
                    :disabled="!valid && !loading"
                    @click="onSubmit()"
                    >Submit</v-btn
                  >
                </v-flex>
              </v-col>
            </v-form>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Alert from "../shared/Alert";
import GoogleSignInVue from "../shared/GSignIn";
export default {
  components: {
    "app-alert": Alert,
    "bs-signin": GoogleSignInVue,
  },
  props: ["loginInfo"],

  data() {
    return {
      valid: false,
      email: "",
      password: "",
      confirmPassword: "",
      showPwd: false,
      rules: {
        required: (value) => !!value || "Field is required",
        length: (value) =>
          value.length >= 6 || "Passwords must be 6 characters or longer",
      },
      response: "",
    };
  },

  methods: {
    onSubmit() {
      if (this.isRegister) {
        this.signUp();
      } else {
        this.signIn();
      }
    },

    signInWithGoogle(googleUser) {
      const id_token = googleUser.getAuthResponse().id_token;
      console.log("ID Token: " + id_token);

      //send Id_token to the backend
      this.$store.dispatch("signInUserGoogle", { token: id_token });
      googleUser.disconnect();
    },
    onFailure(error) {
      console.log(error);
    },

    signIn() {
      this.$store.dispatch("signInUser", {
        email: this.email,
        password: this.password,
      });
    },

    signUp() {
      this.$store.dispatch("signUpUser", {
        email: this.email,
        password: this.password,
      });
    },

    dismissError() {
      this.$store.dispatch("clearError");
    },
  },

  computed: {
    isRegister() {
      return this.loginInfo == "SignUp";
    },

    user() {
      return this.$store.getters.getAuthUser;
    },

    error() {
      return this.$store.getters.getError;
    },

    loading() {
      return this.$store.getters.getLoading;
    },
  },

  watch: {
    user(value) {
      if (value) {
        this.$router.push("/");
      }
    },
  },

  created() {
    this.$store.dispatch("logOutUser");
    this.$store.dispatch("clearError");
  },
};
</script>
