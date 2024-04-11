document.addEventListener("DOMContentLoaded", () => {
  loadBooksFromStorage();
  searchEvent();

  document.getElementById("submit").onclick = (event) => {
    event.preventDefault();
    addBook();
  };

  document.getElementById("confirmDelete").onclick = confirmDelete;
  document.getElementById("cancelDelete").onclick = () => {
    hideModal();
  };
});

const searchEvent = () => {
  document.getElementById("searchButton").onclick = () => {
    searchBooks();
  };
  document.getElementById("searchInput").onkeyup = (e) => {
    if (e.key === "Enter") {
      searchBooks();
    }
  };
};

const searchBooks = () => {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  const books = getBooks();
  const filterBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm)
  );

  document.getElementById("wrapdone").innerHTML = "";
  document.getElementById("wrapdont").innerHTML = "";

  filterBooks.forEach((book) => {
    createBookElement(book);
  });
};

let currentDeletingId = null;

const showDeleteModal = (id) => {
  currentDeletingId = id;
  document.getElementById("deleteModal").style.display = "block";
};

const hideModal = () => {
  document.getElementById("deleteModal").style.display = "none";
};

const confirmDelete = () => {
  if (currentDeletingId != null) {
    deleteBook(currentDeletingId);
    currentDeletingId = null;
    hideModal();
  }
};

const uniqueID = () => {
  return +new Date();
};

const addBook = () => {
  const judul = document.getElementById("judul").value;
  const autor = document.getElementById("autor").value;
  const year = parseInt(document.getElementById("year").value, 10);
  const isComplete = document.getElementById("check").checked;

  const book = {
    id: uniqueID(),
    title: judul,
    author: autor,
    year: year,
    isComplete: isComplete,
  };

  const books = getBooks();
  books.push(book);
  localStorage.setItem("books", JSON.stringify(books));

  createBookElement(book);
  clearForm();
};

const createBookElement = (book) => {
  const item = document.createElement("div");
  item.className = "item";
  item.id = book.id;

  const div = document.createElement("div");

  const title = document.createElement("h3");
  title.className = "title";
  title.textContent = book.title;

  const about = document.createElement("div");
  about.className = "about";
  about.innerHTML = `<p class="author">${book.author}</p><p class="year">${book.year}</p>`;

  const btnText = book.isComplete ? "Belum  " : "Selesai ";
  const toggleButton = document.createElement("button");
  toggleButton.className = "sudah";
  toggleButton.textContent = btnText;
  toggleButton.onclick = () => {
    toggleBookStatus(book.id);
  };

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Hapus";
  deleteButton.className = "hapus";
  deleteButton.onclick = () => {
    showDeleteModal(book.id);
  };

  const buttonContainer = document.createElement("div");
  buttonContainer.className = "button";
  buttonContainer.appendChild(toggleButton);
  buttonContainer.appendChild(deleteButton);

  div.appendChild(title);
  div.appendChild(about);
  item.appendChild(div);
  item.appendChild(buttonContainer);

  const shelfId = book.isComplete ? "wrapdone" : "wrapdont";
  document.getElementById(shelfId).appendChild(item);
};

const toggleBookStatus = (id) => {
  const books = getBooks();
  const book = books.find((book) => book.id === id);
  if (book) {
    book.isComplete = !book.isComplete;
    localStorage.setItem("books", JSON.stringify(books));
    document.getElementById(id).remove();
    createBookElement(book);
  }
};

const deleteBook = (id) => {
  const books = getBooks();
  const filteredBooks = books.filter((book) => book.id !== id);
  localStorage.setItem("books", JSON.stringify(filteredBooks));
  document.getElementById(id).remove();
};

const getBooks = () => {
  const books = localStorage.getItem("books");
  return books ? JSON.parse(books) : [];
};

const loadBooksFromStorage = () => {
  const books = getBooks();
  books.forEach((book) => {
    createBookElement(book);
  });
};

const clearForm = () => {
  document.getElementById("judul").value = "";
  document.getElementById("autor").value = "";
  document.getElementById("year").value = "";
  document.getElementById("check").checked = false;
};
