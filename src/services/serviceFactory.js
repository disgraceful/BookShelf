import bookService from "./bookService"

const services = {
    book: bookService
};

export const ServiceFactory = {
    get: name => services[name]
};