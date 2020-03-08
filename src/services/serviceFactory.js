import bookService from "./bookService";
import authService from "./authService";
import userService from "./userService";
import seriesService from "./seriesService";
import authorService from "./authorService";

const services = {
    book: bookService,
    auth: authService,
    user: userService,
    series: seriesService,
    author: authorService
};

export const ServiceFactory = {
    get: name => services[name]
};