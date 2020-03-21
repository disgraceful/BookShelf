import { ServiceFactory } from "../services/serviceFactory";
const userService = ServiceFactory.get("user");

export default {
    methods: {
        async favoriteBook() {
            try {
                const result = await userService.setFavorite(
                    this.user.token,
                    this.book
                );
                if (result) {
                    console.log(result);
                    this.book.userData.isFavorited = result.userData.isFavorited;
                }
            } catch (error) {
                console.log(error);
                this.error = error.body;
            }
        },

        async updateBook() {
            try {
                const result = await userService.updateBook(this.user.token, this.book);
                console.log(result);
            } catch (error) {
                console.log(error);
                this.error = error.body;
            }
        }
    }
}