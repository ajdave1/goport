const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const loginPage = document.getElementById("loginPage");
const registerPage = document.getElementById("registerPage");
const showRegister = document.getElementById("showRegister");
const showLogin = document.getElementById("showLogin");

const JSONBIN_API_KEY =
  "$2a$10$AMWioqy36Q76lIY0i07VWOlX6uT4/mPW5R2dP1mgkLzuLiukQZhCC";
const apiurl = "https://api.jsonbin.io/v3/b/66818ba3e41b4d34e40b3bf3";

showRegister.addEventListener("click", function () {
  loginPage.style.display = "none";
  registerPage.style.display = "block";
});

showLogin.addEventListener("click", function () {
  registerPage.style.display = "none";
  loginPage.style.display = "block";
});

registerForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  fetch(`${apiurl}/latest`, {
    headers: {
      "X-Master-Key": JSONBIN_API_KEY,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      let users = data.record;
      if (users.some((user) => user.email === email)) {
        alert("User already exists!");
        return;
      }

      users.push({ email, password });

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
          alert("Registration successful!");
          registerPage.style.display = "none";
          loginPage.style.display = "block";
        })
        .catch((error) => console.error("Error updating JSONBin:", error));
    })
    .catch((error) => console.error("Error fetching JSONBin:", error));
});

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

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
        alert("Login successful!");
        // Redirect to the main page or do something upon successful login
      } else {
        alert("Invalid email or password");
      }
    })
    .catch((error) => console.error("Error fetching JSONBin:", error));
});
