import bookService from "./bookService";
import authService from "./authService";
import userService from "./userService";
import seriesService from "./seriesService";
import authorService from "./authorService";
import feedService from "./feedService";

const services = {
  book: bookService,
  auth: authService,
  user: userService,
  series: seriesService,
  author: authorService,
  feed: feedService,
};

export const ServiceFactory = {
  get: (name) => services[name],
};
