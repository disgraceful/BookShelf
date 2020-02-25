import bookService from "./bookService";
import authService from "./authService";
import userService from "./userService";
import seriesService from "./seriesService";

const services = {
    book: bookService,
    auth: authService,
    user: userService,
    series: seriesService
};

export const ServiceFactory = {
    get: name => services[name]
};