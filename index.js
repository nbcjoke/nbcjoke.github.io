const counterValue = document.querySelector(".counter");
const cartContainer = document.querySelector(".cart_container");
const cartCounter = document.querySelector(".full_cart");
const actionButtons = document.querySelectorAll(".action_button");
let counter = 0;

const openInformation = () => {
  document.querySelector(".side_information").style.width = "400px";
};

const closeInformation = () => {
  document.querySelector(".side_information").style.width = "0";
};

const increment = (productValue) => {
  counter++;

  let input = document.querySelector(`.${productValue}`);

  let newValue = parseInt(input.value) + 1;
  input.value = newValue;

  counterValue.innerHTML = counter;
};

const decrement = (productValue) => {
  counter--;
  let input = document.querySelector(`.${productValue}`);

  let newValue = parseInt(input.value) - 1;
  input.value = newValue;

  const box = input.parentElement;
  const actionButton = box.parentElement.querySelector(".action_button");

  if (newValue < 1) {
    box.classList.add("hidden");
    actionButton.classList.remove("hidden");
    input.value = 1;
  }

  if (counter < 1) {
    cartContainer.style.display = "flex";
    cartCounter.style.display = "none";
  }

  counterValue.innerHTML = counter;
};

for (let i = 0; i < actionButtons.length; i++) {
  const button = actionButtons[i];
  button.addEventListener("click", (event) => {
    counter++;
    if (counter > 0) {
      cartContainer.style.display = "none";
      cartCounter.style.display = "flex";
    }
    counterValue.innerHTML = counter;
    const buttonCliked = event.target;
    const productCounter = buttonCliked.parentElement.children[1];

    buttonCliked.classList.add("hidden");
    productCounter.classList.remove("hidden");
  });
}
