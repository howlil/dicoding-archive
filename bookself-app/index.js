const judul = (document.getElementById("judul").value = "");
const autor = (document.getElementById("autor").value = "");
const year = (document.getElementById("year").value = "");
const check = document.getElementById("check");

let data = [];
let book = { judul, autor, year };

data.push(book);

function createBook(status) {
  //   make element
  const about = document.createElement("div");
  about.className = "about";
  about.innerHTML = `
  <p class="autor">${book.autor}</p> 
  <p class="year">${book.year}</p> 
  `;
  const div = document.createElement("div");
  div.innerHTML = `<h2 class="title">${book.judul}</h2>`;

  const newdiv = document.createElement("div");
  newdiv.appendChild(div);
  newdiv.appendChild(about);

  const btnText = status === "done" ? "belum" : "sudah";
  const btn = document.createElement("div");
  btn.className = "button";
  btn.innerHTML = `
  <button class="sudah">${btnText}</button>
  <button onclick="deleteBook(event)" class="hapus">hapus</button>
  `;

  const item = document.createElement("div");
  item.className = "item";
  item.appendChild(newdiv);
  item.appendChild(btn);

  const direct = status === "done" ? "done" : "dont";
  document.getElementById(direct).appendChild(item);
}

function addBook() {
  const isCheked = document.getElementById("check").checked;
  createBook(isCheked ? "done" : "dont");
  console.log(data);
}

function deleteBook(event) {
  //  event.target = element yang menerima event -> button hapus
  //  .closest(".item") = element induk terdekat dari event.target
  var item = event.target.closest(".item");

  if (item) {
    item.remove();
  }
}
