const JSONBIN_API_KEY =
  "$2a$10$AMWioqy36Q76lIY0i07VWOlX6uT4/mPW5R2dP1mgkLzuLiukQZhCC";
const apiurl = "https://api.jsonbin.io/v3/b/66818ba3e41b4d34e40b3bf3";
let register = document.querySelector(".register-button");
let username = localStorage.getItem("username");
// let userposts = JSON.parse(localStorage.getItem("posts"));
let gender = localStorage.getItem("gender");
let loginstatus = document.querySelector(".login-status");
let registerstatus = document.querySelector(".register-status");
const userpostcontainer = document.querySelector("#mypost");
let nopost = document.querySelector(".empty-post");
let notification = document.querySelector(".notification");
console.log(gender);
try {
  displayprofile(gender);
} catch (error) {}

// try {
//   duserpost();
// } catch (error) {
//   console.log(error);
// }

// function duserpost() {
//   userposts.forEach((userpost) => {
//     nopost.classList.add("hide-item");
//     userpostcontainer.innerHTML += `
//     <div class="poster-name">You <span>posted</span></div>
//                   <div class="post-image"><img src="${userpost.image}"></div>
//                   <div class="post-description">
//                 ${userpost.description}
//                   </div>
//                   <div class="post-bottom">
//                       <span id="delete-post">delete</span>
//                       <span class="post-date">${userpost.category}</span>
//                       <span class="location">earth</span>
//                   </div>
//     `;
//   });
// }

register.addEventListener("click", function (event) {
  event.preventDefault();
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;
  const name = document.querySelector("#register-name").value;
  let gender = document.querySelector("#gender");
  const confirmpassword = document.querySelector("#confirm-password").value;
  if (email === "" || password === "" || name === "") {
    notifyError("Please provide all the informations required");
    return;
  }
  if (password.length < 6) {
    notifyError(" Password can't be less than six characters");
    return;
  }
  if (password != confirmpassword) {
    notifyError("Unable to confirm password ");
    return;
  }
  if (gender.value === "default") {
    notifyError("Please choose your gender ");
    return;
  }

  fetch(`${apiurl}/latest`, {
    headers: {
      "X-Master-Key": JSONBIN_API_KEY,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      let users = data.record;
      if (users.some((user) => user.email === email)) {
        notifyError("User already exist!");
        return;
      }

      users.push({ email, password, name, gender: gender.value });

      fetch(`${apiurl}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": JSONBIN_API_KEY,
        },
        body: JSON.stringify(users),
      })
        .then((response) => response.json())
        .then((data) => {
          notifySucess("Registration successful");
          setTimeout(() => {
            loginpage.style = "display:block";
            createaccount.style = "display:none";
          }, 3000);
        })
        .catch((error) => {
          notifyError("Please check your internet connection");
        });
    })
    .catch((error) => {
      notifyError("Please check your internet connection");
    });
});
function notifyError(message) {
  notification.innerHTML = message;
  notification.classList.add("error");
  notification.classList.remove("hide-notification");
  notification.classList.add("view-notification");
  notification.classList.remove("success");
  setTimeout(() => {
    notification.classList.add("hide-notification");
    notification.classList.remove("view-notification");
  }, 3000);
}
function notifySucess(message) {
  notification.innerHTML = message;
  notification.classList.remove("error");
  notification.classList.remove("hide-notification");
  notification.classList.add("view-notification");
  notification.classList.add("success");
  setTimeout(() => {
    notification.classList.add("hide-notification");
    notification.classList.remove("view-notification");
  }, 3000);
}
const loginbutton = document.querySelector(".login-button");
loginbutton.addEventListener("click", function (event) {
  event.preventDefault();
  const email = document.getElementById("user-email").value;
  const password = document.getElementById("user-password").value;
  if (email === "" && password === "") {
    notifyError("Please enter your email and password");
    return;
  }
  if (password.length < 6) {
    notifyError("Your password can't be less than six characters");
    return;
  }
  fetch(`${apiurl}/latest`, {
    headers: {
      "X-Master-Key": JSONBIN_API_KEY,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      let users = data.record;

      const user = users.find((user) => {
        return user.email === email && user.password === password;
      });

      if (user) {
        notifySucess("Log In successful");
        localStorage.setItem("username", user.name);
        localStorage.setItem("gender", user.gender);

        // console.log(user.userposts);

        //////////////////
        // function postcontent() {
        //   renderallposts();
        //   let uploading = {
        //     postername: username,
        //     category: post_category,
        //     description: post_description.value,
        //     image: post_image.src,
        //     date: currentdate,
        //   };
        //   let userupload = {
        //     image: "validsrc",
        //     description: "testing user post",
        //     category: "police brutality",
        //   };
        //   console.log(uploading);
        //   general.push(uploading);

        //   fetch(`${allposturl}`, {
        //     method: "PUT",
        //     headers: {
        //       "Content-Type": "application/json",
        //       "X-Master-Key": allpostkey,
        //     },
        //     body: JSON.stringify(general),
        //   })
        //     .then((response) => response.json())
        //     .then((data) => {
        //       console.log(data);
        //       console.log("Post added", data);
        //     })
        //     .catch((error) => console.error("Error:", error));

        //   // ==============

        //   fetch(`${apiurl}/latest`, {
        //     headers: {
        //       "X-Master-Key": JSONBIN_API_KEY,
        //     },
        //   })
        //     .then((response) => response.json())
        //     .then((data) => {
        //       let userdata = data.record;
        //       userdata.userposts.push(userupload);

        //       fetch(`${apiurl}`, {
        //         method: "PUT",
        //         headers: {
        //           "Content-Type": "application/json",
        //           "X-Master-Key": JSONBIN_API_KEY,
        //         },
        //         body: JSON.stringify(userdata),
        //       })
        //         .then((response) => response.json())
        //         .then((data) => {
        //           console.log("done!!!");
        //         })
        //         .catch((error) => console.error("Error:", error));

        // document
        //   .querySelector("#add-post-btn")
        //   .addEventListener("click", () => {
        //     postcontent;
        //   });
        /////////////////
        // if (user.userposts != "undefined") {
        //   localStorage.setItem("posts", JSON.stringify(user.userposts));
        // }
        document.location = "home.html";
      } else {
        notifyError("Incorrect email or password");
      }
    })
    .catch((error) => {
      notifyError("Please check your internet connection");
    });
});
function displayprofile(genderIn) {
  let profileimage = document.querySelector(".user-profile-image");
  if (genderIn === "male") {
    profileimage.innerHTML = `
               <img src="./img/user avatar male.png" id="profile-picture" >
      `;
  } else if (genderIn === "female") {
    profileimage.innerHTML = `
           <img src= "./img/user avatar female.avif " id="profile-picture" >
        `;
  } else console.log("error");
}
