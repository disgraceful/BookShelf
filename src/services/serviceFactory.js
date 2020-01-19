import bookService from "./bookService";
import authService from "./authService";

const services = {
    book: bookService,
    auth: authService
};

export const ServiceFactory = {
    get: name => services[name]
};