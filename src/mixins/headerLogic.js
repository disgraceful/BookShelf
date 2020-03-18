import SearchBar from "../components/header/SearchBar"
export default {
    data() {
        return {
            menuActive: false,
            menuList: [
                {
                    name: "Statistics",
                    action: () =>
                        this.$router.push({ name: "user", params: { id: this.user.id } })
                },
                { name: "Logout", action: this.logOut }
            ]
        };
    },
    components: {
        "bs-search-bar": SearchBar
    },
    computed: {
        headerLinks() {
            let headerLinks = [
                { name: "SignUp", to: "register" },
                { name: "SignIn", to: "login" }
            ];
            if (this.userIsAuthenticated) {
                headerLinks = [
                    { name: "Favorites", to: "favorites" },
                    { name: "Content", to: "content" },
                    { name: "New content", to: "content" }
                ];
            }
            return headerLinks;
        },
        user() {
            return this.$store.getters.getAuthUser;
        },
        userIsAuthenticated() {
            return this.user !== null && this.user !== undefined;
        },
        username() {
            return this.user.email.replace(new RegExp(/@[\s\S]*/g), "");
        }
    },
    methods: {
        logOut() {
            this.menuActive = false;
            this.$store.dispatch("logOutUser");
            this.$router.push({ name: "login" });
        }
    }
};