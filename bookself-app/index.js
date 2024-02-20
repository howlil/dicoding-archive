function addBook() {
  const judul = document.getElementById("judul").value;
  const autor = document.getElementById("autor").value;
  const year = document.getElementById("year").value;

  const about = document.createElement("div");
  about.className = "about";
  about.innerHTML = `
  <p class ="autor">${autor}</p> 
  <p class ="year">${year}</p> 
  `;
  const div = document.createElement("div");
  div.innerHTML = `   <h2 class="title">${judul}</h2>  `;

  const newdiv = document.createElement("div");
  newdiv.appendChild(div);
  newdiv.appendChild(about);

  const btn = document.createElement("div");
  btn.className = "button";
  btn.innerHTML = `
  <button class="sudah">sudah</button>
  <button class="hapus">hapus</button>
  `;

  const item = document.createElement("div");
  item.className = "item";
  item.appendChild(newdiv);
  item.appendChild(btn);

  document.getElementById("dont").appendChild(item)

  
}
