const navmenu = document.querySelector(".nav-menu");
const burger = document.querySelector(".burger");

burger.addEventListener("click", mobile);
function mobile ()  {
  burger.classList.toggle("active");
  navmenu.classList.toggle("active");

};
