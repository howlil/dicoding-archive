const { nanoid } = require('nanoid');

let books = [];

exports.addBook = async ({
  name, year, author, summary, publisher, pageCount, readPage, reading,
}) => {
  const id = await nanoid();
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = pageCount === readPage;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    finished,
    insertedAt,
    updatedAt,
  };
  books.push(newBook);
  return id;
};

exports.getAllBooks = () => books.map(({ id, name, publisher }) => ({ id, name, publisher }));

exports.getBookById = (id) => books.find((book) => book.id === id);

exports.updateBookById = (id, updates) => {
  const index = books.findIndex((book) => book.id === id);
  if (index !== -1) {
    books[index] = {
      ...books[index],
      ...updates,
      updatedAt: new Date().toISOString(),
      finished: updates.pageCount === updates.readPage,
    };
    return true;
  }
  return false;
};

exports.deleteBookById = (id) => {
  const initialLength = books.length;
  books = books.filter((book) => book.id !== id);
  return books.length < initialLength;
};
