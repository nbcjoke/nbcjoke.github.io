const counterValue = document.querySelector(".counter");
const cartContainer = document.querySelector(".cart_container");
const cartCounter = document.querySelector(".full_cart");
let counter = 0;

const openInformation = () => {
  document.querySelector(".mySidenav").style.width = "440px";
};

const closeInformation = () => {
  document.querySelector(".mySidenav").style.width = "0";
};

const increment = (productValue) => {
  counter++;
  let input = document.querySelector(`.${productValue}`);

  let newValue = parseInt(input.value) + 1;
  input.value = newValue;

  if (counter > 0) {
    cartContainer.style.display = "none";
    cartCounter.style.display = "block";
  }

  counterValue.innerHTML = counter;
};

const decrement = (productValue) => {
  counter--;
  let input = document.querySelector(`.${productValue}`);

  let newValue = parseInt(input.value) - 1;
  input.value = newValue;

  let box = input.parentElement;

  if (newValue < 1) {
    box.style.opacity = "0";
  }

  if (counter < 1) {
    cartContainer.style.display = "flex";
    cartCounter.style.display = "none";
  }

  counterValue.innerHTML = counter;
};
