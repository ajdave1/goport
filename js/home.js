let menubutton = document.getElementById("menu-open");
function displaymenu() {
  let menu = document.querySelector(".user-navigation");
  if (menu.classList.contains("menuopen")) {
    menu.classList.remove("menuopen");
  } else menu.classList.add("menuopen");
}
menubutton.addEventListener("click", () => displaymenu());

let displayusername = document.querySelector(".profile-name");
displayusername.innerHTML = username;
let postimage = document.querySelector("#upload-post-image");
let profilePicture = document.getElementById("post-image-uploaded");
// let displaymypost = document.querySelector("#mypost-btn");
postimage.onchange = () => {
  profilePicture.src = URL.createObjectURL(postimage.files[0]);
};
let mainMenu = document.querySelector(".generalpost");
let addPostContainer = document.querySelector(".add-post");
let mypostcontiner = document.querySelector(".user-post");
const displayaddpost = document.querySelector("#display-add-post");
let addpostnow = document.querySelector("#post-now");
addpostnow.addEventListener("click", () => {
  setTimeout(() => {
    addpost();
  }, 1000);
});
displayaddpost.addEventListener("click", () => {
  toggledropdown();
  addpost();
});
function addpost() {
  addPostContainer.classList.add("view-item");
  addPostContainer.classList.remove("hide-item");
  mainMenu.classList.add("hide-item");
  mypostcontiner.classList.add("hide-item");
  mypostcontiner.classList.remove("view-item");
  document.querySelector(".page-title").innerHTML = "Upload ";
}
let dropdowon = document.querySelector(".drop-down");
document.querySelector(".bx-camera").addEventListener("click", function () {
  toggledropdown();
});
function toggledropdown() {
  if (dropdowon.classList.contains("view-menu")) {
    dropdowon.classList.add("hide-menu");
    dropdowon.classList.remove("view-menu");
  } else if (dropdowon.classList.contains("hide-menu")) {
    dropdowon.classList.add("view-menu");
    dropdowon.classList.remove("hide-menu");
  }
}
// displaymypost.addEventListener("click", () => {
//   mypostcontiner.classList.add("view-item");
//   mypostcontiner.classList.remove("hide-item");
//   mainMenu.classList.add("hide-item");
//   addPostContainer.classList.add("hide-item");
//   addPostContainer.classList.remove("view-item");
//   displaymenu();
// });
let Customalert = document.querySelector(".alert");
let signOutbutton = document.querySelector("#sign-out-button");
let quitSignout = document.querySelector("#quit-sign-out");
document.querySelector("#open-sign-out").addEventListener("click", () => {
  setTimeout(() => {
    Customalert.classList.add("view-alert");
    Customalert.classList.remove("hide-item");
  }, 500);
});
quitSignout.addEventListener("click", () => {
  Customalert.classList.remove("view-alert");
  Customalert.classList.add("hide-item");
});
signOutbutton.addEventListener("click", () => {
  document.location = "index.html";
});
