const BookController = require('../controllers/book');

module.exports = [
  { method: 'GET', path: '/books', handler: BookController.getAllBooksHandler },
  { method: 'POST', path: '/books', handler: BookController.addBookHandler },
  { method: 'GET', path: '/books/{bookId}', handler: BookController.getBookByIdHandler },
  { method: 'PUT', path: '/books/{bookId}', handler: BookController.updateBookByIdHandler },
  { method: 'DELETE', path: '/books/{bookId}', handler: BookController.deleteBookByIdHandler },
];
