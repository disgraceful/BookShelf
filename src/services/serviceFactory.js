import bookService from "./bookService";
import authService from "./authService";
import userService from "./userService";

const services = {
    book: bookService,
    auth: authService,
    user: userService
};

export const ServiceFactory = {
    get: name => services[name]
};