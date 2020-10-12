export default {
  data() {
    return {
      menuActive: false,
      menuList: [
        {
          name: "Statistics",
          action: () => this.$router.push({ name: "user", params: { id: this.user.id } }),
        },
        { name: "Logout", action: this.logOut },
      ],
    };
  },
  computed: {
    headerLinks() {
      let headerLinks = [
        { name: "SignUp", to: "register" },
        { name: "SignIn", to: "login" },
      ];
      if (this.user) {
        headerLinks = [
          {
            name: "Favorites",
            to: { name: "favorites", params: { id: this.user.id } },
          },
          {
            name: "My Books",
            to: { name: "mybooks", params: { id: this.user.id } },
          },
          { name: "New content", to: "content" },
        ];
      }
      return headerLinks;
    },
    user() {
      return this.$store.getters.getAuthUser;
    },

    username() {
      return this.user.email.replace(new RegExp(/@[\s\S]*/g), "");
    },
  },
  methods: {
    logOut() {
      this.menuActive = false;
      this.$store.dispatch("logOutUser");
      this.$router.push({ name: "login" });
    },
  },
};
