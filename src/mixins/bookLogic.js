import { ServiceFactory } from "../services/serviceFactory";
const userService = ServiceFactory.get("user");

export default {
  methods: {
    async favoriteBook() {
      try {
        console.log(this.book);
        const response = await userService.setFavorite(this.book);
        console.log(response);
        if (response) {
          this.book.userData.isFavorited = response.body.userData.isFavorited;
        }
      } catch (error) {
        console.log(error);
        this.error = error.body;
      }
    },

    async updateBook() {
      try {
        const response = await userService.updateBook(this.book);
      } catch (error) {
        console.log(error);
        this.error = error.body;
      }
    },
  },
};
