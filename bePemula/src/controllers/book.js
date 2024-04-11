const {
  addBook,
  getAllBooks,
  getBookById,
  updateBookById,
  deleteBookById,
} = require("../models/book");

exports.getAllBooksHandler = (request, h) => {
  const { name, reading, finished } = request.query;
  let filteredBooks = getAllBooks(); 
  if (name) {
    filteredBooks = filteredBooks.filter((book) =>
      book.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (reading !== undefined) {
    const isReading = reading === '1'; 
    filteredBooks = filteredBooks.filter((book) =>
      book.reading === isReading
    );
  }

  if (finished !== undefined) {
    const isFinished = finished === '1'; 
    filteredBooks = filteredBooks.filter((book) =>
      book.finished === isFinished
    );
  }

  const resultBooks = filteredBooks.map(({ id, name, publisher }) => ({
    id, name, publisher
  }));

  return h.response({
    status: 'success',
    data: {
      books: resultBooks,
    },
  }).code(200);
};


exports.addBookHandler = async (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  if (!name || readPage > pageCount) {
    return h
      .response({
        status: "fail",
        message: !name
          ? "Gagal menambahkan buku. Mohon isi nama buku"
          : "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
      })
      .code(400);
  }

  const bookId = await addBook({
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  });

  return h
    .response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId,
      },
    })
    .code(201);
};

exports.getBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const book = getBookById(bookId);

  if (!book) {
    return h
      .response({
        status: "fail",
        message: "Buku tidak ditemukan",
      })
      .code(404);
  }

  return h
    .response({
      status: "success",
      data: {
        book,
      },
    })
    .code(200);
};

exports.updateBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const updates = request.payload;

  if (!updates.name || updates.readPage > updates.pageCount) {
    return h
      .response({
        status: "fail",
        message: !updates.name
          ? "Gagal memperbarui buku. Mohon isi nama buku"
          : "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
      })
      .code(400);
  }

  const isUpdated = updateBookById(bookId, updates);

  if (!isUpdated) {
    return h
      .response({
        status: "fail",
        message: "Gagal memperbarui buku. Id tidak ditemukan",
      })
      .code(404);
  }

  return h
    .response({
      status: "success",
      message: "Buku berhasil diperbarui",
    })
    .code(200);
};

exports.deleteBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const isDeleted = deleteBookById(bookId);

  if (!isDeleted) {
    return h
      .response({
        status: "fail",
        message: "Buku gagal dihapus. Id tidak ditemukan",
      })
      .code(404);
  }

  return h
    .response({
      status: "success",
      message: "Buku berhasil dihapus",
    })
    .code(200);
};
