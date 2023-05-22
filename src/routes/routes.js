const {
  addBookHandler,
  getAllBooksHandler,
  deleteBookByIdHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  findBook,
} = require("../handler/books_handler");

const routes = [
  // notes route
  {
    method: "POST",
    path: "/books",
    handler: addBookHandler,
  },
  {
    method: "GET",
    path: "/books",
    handler: getAllBooksHandler,
  },
  {
    method: "GET",
    path: "/books/{id}",
    handler: getBookByIdHandler,
  },
  {
    method: "PUT",
    path: "/books/{id}",
    handler: editBookByIdHandler,
  },
  {
    method: "DELETE",
    path: "/books/{id}",
    handler: deleteBookByIdHandler,
  },
  {
    method: "GET",
    path: "/find-books",
    handler: findBook,
  },
];

module.exports = routes;
