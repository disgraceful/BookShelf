import bookService from "./bookService";
import authService from "./authService";
import userService from "./userService";
import seriesService from "./seriesService";
import authorService from "./authorService";
import feedService from "./feedService";
import uploadService from "./uploadService";

const services = {
  book: bookService,
  auth: authService,
  user: userService,
  series: seriesService,
  author: authorService,
  feed: feedService,
  upload: uploadService,
};

export const ServiceFactory = {
  get: (name) => services[name],
};
