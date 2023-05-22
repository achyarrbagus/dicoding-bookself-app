const books = require("../books/books");
const { nanoid } = require("nanoid");

const addBookHandler = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, finished, reading } = request.payload;
  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };
  if (!newBook.name) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }
  if (newBook.readPage > newBook.pageCount) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }

  //
  const response = h.response({
    status: "success",
    message: "Buku Berhasil ditambahkan",
    data: {
      bookId: newBook.id,
    },
  });
  response.code(200);
  books.push(newBook);
  return response;
};

const getAllBooksHandler = (request, h) => {
  const { reading, finished } = request.query;
  if (reading > 0) {
    let data = books.filter((item) => {
      const isRead = item.reading == true;
      return isRead;
    });
    let dataf = data.map((item) => {
      return {
        id: item.id,
        name: item.name,
        publisher: item.publisher,
      };
    });
    const response = h.response({
      status: "success",
      data: dataf.length > 0 ? dataf : [],
    });
    response.code(200);
    return response;
  } else if (finished > 0) {
    let data = books.filter((item) => {
      const isRead = item.finished == true;
      return isRead;
    });
    let dataf = data.map((item) => {
      return {
        id: item.id,
        name: item.name,
        publisher: item.publisher,
      };
    });
    const response = h.response({
      status: "success",
      data: dataf.length > 0 ? dataf : [],
    });
    response.code(200);
    return response;
  } else if (reading) {
    let data = books.filter((item) => {
      const isRead = item.reading == false;
      return isRead;
    });
    let dataf = data.map((item) => {
      return {
        id: item.id,
        name: item.name,
        publisher: item.publisher,
      };
    });
    const response = h.response({
      status: "success",
      data: dataf.length > 0 ? dataf : [],
    });
    response.code(200);
    return response;
  } else if (finished) {
    let data = books.filter((item) => {
      const isRead = item.finished == false;
      return isRead;
    });
    let dataf = data.map((item) => {
      return {
        id: item.id,
        name: item.name,
        publisher: item.publisher,
      };
    });
    const response = h.response({
      status: "success",
      data: dataf.length > 0 ? dataf : [],
    });
    response.code(200);
    return response;
  } else {
    let dataf = books.map((item) => {
      return {
        id: item.id,
        name: item.name,
        publisher: item.publisher,
      };
    });
    const response = h.response({
      status: "success",
      data: dataf.length > 0 ? dataf : [],
    });
    response.code(200);
    return response;
  }
};

const getBookByIdHandler = (request, h) => {
  const { id } = request.params;
  const book = books.find((n) => n.id === id);

  if (book) {
    return {
      status: "success",
      data: {
        book,
      },
    };
  }
  const response = h.response({
    status: "fail",
    message: "Buku tidak ditemukan",
  });
  response.code(404);
  return response;
};

const editBookByIdHandler = (request, h) => {
  const { id } = request.params;

  const { name, year, author, summary, publisher, pageCount, readPage, finished, reading } = request.payload;
  const updatedAt = new Date().toISOString();

  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      updatedAt,
    };

    const response = h.response({
      status: "success",
      message: "Buku berhasil diperbarui",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Buku tidak ditemukan",
  });
  response.code(404);
  return response;
};

const deleteBookByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: "success",
      message: "Buku berhasil dihapus",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Buku gagal dihapus. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

const findBook = (request, h) => {
  const { name, year, author, summary, publisher } = request.query;
  const filterBook = books.filter((item) => {
    if (name) {
      const titleMatch = item?.name && item?.name.toLowerCase().includes(name.toLowerCase());
      return titleMatch;
    } else if (year) {
      const yearMacth = item.year.toString() === year;
      return yearMacth;
    } else if (author) {
      const authorMacth = item?.author && item?.author.toLowerCase().includes(author.toLowerCase());
      return authorMacth;
    } else if (summary) {
      const summaryMacth = item?.summary && item?.summary.toLowerCase().includes(summary.toLowerCase());
      return summaryMacth;
    } else {
      const publisherMacth = item?.publisher && item?.publisher.toLowerCase().includes(publisher.toLowerCase());
      return publisherMacth;
    }
  });
  if (filterBook.length != 0) {
    const response = h.response({
      status: "success",
      message: "Buku berhasil ditemukan",
      data: filterBook,
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "Buku tidak ditemukan",
  });
  response.code(404);
  return response;
};

module.exports = {
  findBook,
  deleteBookByIdHandler,
  editBookByIdHandler,
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
};
