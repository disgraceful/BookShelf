import { ServiceFactory } from "../services/serviceFactory";
const userService = ServiceFactory.get("user");

export default {
  methods: {
    favoriteBook(book) {
      return userService.setFavorite(book); // DONT NEED
    },

    async updateBook() {
      try {
        await userService.updateBook(this.book);
      } catch (error) {
        console.log(error);
        this.error = error.body;
      }
    },
  },
};
