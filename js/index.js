let post_image = document.querySelector("#post-image-uploaded");
let post_description = document.querySelector("#post-content");
let post_category;
let currentmode = JSON.parse(localStorage.getItem("currentmode"));
let modeswitch = document.querySelector(".switch-mode");
let navigationBar = document.querySelector(".navigation-bar");
let footer = document.querySelector("footer");
let loginpage = document.getElementById("login");
let createaccount = document.querySelector("#create-account");
let generalpost_container = document.querySelector("#post-cont");
const allposturl = "https://api.jsonbin.io/v3/b/66830310ad19ca34f88175ac";
const allpostkey =
  "$2a$10$AMWioqy36Q76lIY0i07VWOlX6uT4/mPW5R2dP1mgkLzuLiukQZhCC";
const date = new Date();
let months = [
  "Jan",
  "Feb",
  "Mar",
  "April",
  "May",
  "Jun",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let day = date.getDay();

if (day < 10) {
  day = "0" + day;
}
const currentmonth = months[date.getMonth()];
let year = date.getFullYear();
let currentdate = currentmonth + "-" + day + "-" + year;
currentdate.toString();

if (currentmode === "black") {
  darkmode();
} else if (currentmode === "white") {
  whitemode();
}

renderallposts();

function toggle(text) {
  if (text === "create") {
    createaccount.style = "display:block";
    loginpage.style = "display:none";
  } else if (text === "login") {
    loginpage.style = "display:block";
    createaccount.style = "display:none";
  }
}

function renderallposts() {
  fetch(`${allposturl}/latest`, {
    headers: {
      "X-Master-Key": allpostkey,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      let general = data.record;
      general.forEach((post) => {
        generalpost_container.innerHTML += `
          <div id="g-post">
          <div class="poster-name">${post.postername} <span>posted</span></div>
                <div class="post-image"><img src="${post.image}"></div>
                <div class="post-description">
               ${post.description}
                </div>
                <div class="post-bottom">
                    <span class="post-date">${post.date}</span>
                    <span class="location">${post.category}</span>
                </div> 
                </div>
        `;
      });
      function postcontent() {
        const theimage = post_image.src;

        if (!theimage) {
          console.error("No image selected.");
          return;
        }

        let uploading = {
          postername: username,
          category: post_category,
          description: post_description.value,
          image: theimage,
          date: currentdate,
        };

        console.log(uploading);
        general.push(uploading);

        fetch(`${allposturl}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "X-Master-Key": allpostkey,
          },
          body: JSON.stringify(general),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            console.log("Post added", data);
          })
          .catch((error) => console.error("Error:", error));

        // ==============
      }

      document.querySelector("#add-post-btn").addEventListener("click", () => {
        postcontent();
      });
    });
}

function selectpostcategory(category) {
  return (post_category = category);
}
// function postcontent() {
//   let uploading = [];
//   uploading.push({
//     postername: username,
//     category: post_category,
//     description: post_description.value,
//     image: post_image.src,
//     date: currentdate,
//   });
//   fetch(`${allposturl}`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "X-Master-Key": allpostkey,
//     },
//     body: JSON.stringify(uploading),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log("posted added ");
//     })
//     .catch((error) => console.error("error", error));
// }

modeswitch.addEventListener("click", () => {
  if (document.body.classList.contains("whitemode")) {
    darkmode();
    currentmode = "black";
  } else if (document.body.classList.contains("darkmode")) {
    whitemode();
    currentmode = "white";
  }
  localStorage.setItem("currentmode", JSON.stringify(currentmode));
});
function darkmode() {
  document.body.classList.add("darkmode");
  document.body.classList.remove("whitemode");
  navigationBar.classList.add("black");
  navigationBar.classList.remove("white");
  footer.classList.add("black");
  footer.classList.remove("white");
}
function whitemode() {
  document.body.classList.add("whitemode");
  document.body.classList.remove("darkmode");
  navigationBar.classList.add("white");
  navigationBar.classList.remove("black");
  footer.classList.add("white");
  footer.classList.remove("black");
}
