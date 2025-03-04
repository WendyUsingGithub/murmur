const login = document.getElementById("login");
const register = document.getElementById("register");
const indicator = document.getElementById("indicator");
const login_card = document.getElementById("login-card");
const register_card = document.getElementById("register-card");
let state = "left";

login.addEventListener("click", function () {
  state = "left";
  indicator.classList.remove("left");
  indicator.classList.remove("right");
  indicator.classList.add("left");
  
  login_card.classList.remove("hide");
  register_card.classList.remove("hide");
  register_card.classList.add("hide");

})

register.addEventListener("click", function () {
  state = "right";
  indicator.classList.remove("left");
  indicator.classList.remove("right");
  indicator.classList.add("right");

  login_card.classList.remove("hide");
  register_card.classList.remove("hide");
  login_card.classList.add("hide");
})


login.addEventListener("mouseenter", function () {
  indicator.classList.remove("right");
  indicator.classList.add("left");
})

register.addEventListener("mouseenter", function () {
  indicator.classList.remove("left");
  indicator.classList.add("right");
})

login.addEventListener("mouseleave", function () {
  indicator.classList.remove("left");
  indicator.classList.remove("right");
  indicator.classList.add(state);
})

register.addEventListener("mouseleave", function () {
  indicator.classList.remove("left");
  indicator.classList.remove("right");
  indicator.classList.add(state);
})