<template>
  <v-container>
    <v-row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-container>
            <v-card-title>
              {{ loginInfo }}
            </v-card-title>
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
                <v-flex xs12>
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
                </v-flex>
              </v-col>
              <v-col v-if="isRegister">
                <v-flex xs12>
                  <v-text-field
                    name="confirmPassword"
                    label="Confirm Password"
                    id="confirmPassword"
                    v-model="confirmPassword"
                    :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPwd ? 'text' : 'password'"
                    :rules="[rules.required, rules.confirmPassword]"
                    @click:append="showPwd = !showPwd"
                  ></v-text-field>
                </v-flex>
              </v-col>
              <v-col v-if="error">
                <app-alert
                  :message="error.message"
                  @dismissed="dismissError"
                ></app-alert>
              </v-col>
              <v-col>
                <v-flex xs12>
                  <v-btn class="mr-3" :disabled="!valid" @click="onSubmit()"
                    >Submit</v-btn
                  >
                  <v-btn
                    color="primary"
                    v-text="
                      isRegister ? 'SignUp with Google' : 'SignIn with Google'
                    "
                  ></v-btn>
                </v-flex>
              </v-col>
            </v-form>
          </v-container>
        </v-card>
      </v-flex>
    </v-row>
  </v-container>
</template>

<script>
import Alert from "../shared/Alert";
export default {
  data() {
    return {
      valid: false,
      email: "",
      password: "",
      confirmPassword: "",
      showPwd: false,
      rules: {
        required: value => !!value || "Field is required",
        length: value =>
          value.length >= 6 || "Passwords must be 6 characters or longer",
        confirmPassword: value =>
          value === this.password || "Passwords do not match"
      },
      response: ""
    };
  },
  props: ["loginInfo"],
  methods: {
    toLogin() {},
    onSubmit() {
      if (this.isRegister) {
        this.signUp();
      } else {
        this.signIn();
      }
    },
    signIn() {
      this.$store.dispatch("signInUser", {
        email: this.email,
        password: this.password
      });
    },
    signUp() {
      this.$store.dispatch("signUpUser", {
        email: this.email,
        password: this.password
      });
    },
    dismissError() {
      this.$store.dispatch("clearError");
    }
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
    }
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push("/");
      }
    }
  },
  components: {
    "app-alert": Alert
  }
};
</script>
