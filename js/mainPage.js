const $carListContainer = document.querySelector(".carListContainer");
const $costumizePage = document.getElementById("costumizePage");
const $carFilter = document.getElementById("car-filter");
const $return = document.querySelector("#return1");
const $return2 = document.querySelector("#return2");
const $accItem = document.querySelectorAll(".accItem");
const $customImg = document.getElementById("customImg");
const $customMake = document.getElementById("customMake");
const $customHp = document.getElementById("customHp");
const $customYear = document.getElementById("customYear");
const $customMileage = document.getElementById("customMileage");
const $customPrice = document.getElementById("customPrice");
const $totalPrice = document.getElementById("totalPrice");
const dateInput = document.getElementById("data");
const inputValue = document.getElementById("nameAndSurname");
const $buy = document.getElementById("buy");
const $endPage = document.getElementById("endScreen");
const $cash = document.getElementById("cash");
const $leasing = document.getElementById("leasing");
const $recapContainer = document.getElementById("recap");
const $recapImg = document.getElementById("recapImg");
const $recapName = document.getElementById("recapName");
const $recapPayment = document.getElementById("recapPayment");
const $recapDate = document.getElementById("recapDate");
const radioButtons = document.querySelectorAll(
  'input[type="radio"][name="radio"]'
);

const $recapPrice = document.getElementById("recapPrice");

let carPrice;
let selectedCar = {
  img: "",
  make: "",
  model: "",
};

function displayCars(cars) {
  $carListContainer.innerHTML = "";
  cars.forEach((car) => {
    const carDiv = document.createElement("div");
    carDiv.classList.add("carItem");
    carDiv.innerHTML = `
      <img class="cardCarImg" src="${car.image}" alt="${car.brand} ${car.model}">
      <h2>${car.brand} ${car.model}</h2>
      <p>Year: <span>${car.year}</span></p>
      <p>Power: <span>${car.power}</span></p>
      <p>Mileage: <span>${car.mileage}</span></p>
      <h2 class="price"><span>$${car.price}<span></h2>
    `;

    carDiv.addEventListener("click", function () {
      $costumizePage.classList.remove("hidden");
      $customImg.src = `${car.image}`;
      $customMake.innerHTML = `${car.brand} ${car.model}`;
      $customYear.innerHTML = `${car.year}`;
      $customHp.innerHTML = `${car.power}`;
      $customMileage.innerHTML = `${car.mileage}`;
      $customPrice.innerHTML = `$${car.price}`;
      carPrice = car.price;
      $totalPrice.innerText = `$${carPrice}`;
      selectedCar.img = `${car.image}`;
      selectedCar.make = `${car.brand}`;
      selectedCar.model = `${car.model}`;
    });

    $carListContainer.appendChild(carDiv);
  });
}

function filterCars(make) {
  if (make === "any") {
    displayCars(carList);
  } else {
    const filteredCars = carList.filter(
      (car) => car.brand.toLowerCase() === make
    );
    displayCars(filteredCars);
  }
}

$carFilter.addEventListener("change", function () {
  const selectedMake = this.value.toLowerCase();
  filterCars(selectedMake);
});

displayCars(carList);

$return.addEventListener("click", () => {
  $costumizePage.classList.add("hidden");

  for (let i = 0; i < $accItem.length; i++) {
    if ($accItem[i].classList.contains("accItemClicked")) {
      $accItem[i].classList.remove("accItemClicked");
    }
  }
});

let itemPrice;

for (let i = 0; i < $accItem.length; i++) {
  $accItem[i].addEventListener("click", function () {
    this.classList.toggle("accItemClicked");
    let itemValues = this.querySelector("span").textContent;
    itemPrice = parseInt(itemValues);

    if (this.classList.contains("accItemClicked")) {
      carPrice += itemPrice;
    } else {
      carPrice -= itemPrice;
    }

    $totalPrice.innerText = `$${carPrice}`;
  });
}

// date------------------

let today = new Date();
today.setDate(today.getDate() + 14);
let minimalDate = today.toISOString().split("T")[0];
dateInput.setAttribute("min", minimalDate);

let pricingMethod;
const changePricingMethod = function () {
  pricingMethod = this.textContent;
};

$cash.addEventListener("click", changePricingMethod);
$leasing.addEventListener("click", changePricingMethod);

// formCheck-----------------

let selectedSpanContent;

function radioBtnCheck() {
  radioButtons.forEach((radioButton) => {
    if (radioButton.checked) {
      selectedSpanContent =
        radioButton.parentElement.querySelector("span.name").textContent;
    }
  });
}

function recapPageContent(selectedCar) {
  radioBtnCheck();
  $recapImg.src = `${selectedCar.img}`;
  $recapName.innerHTML = `${inputValue.value}, thank you for purchasing the ${selectedCar.make} ${selectedCar.model}`;
  $recapPayment.innerHTML = `Payment method: ${selectedSpanContent}`;
  $recapDate.innerHTML = `Delivery date: ${dateInput.value}`;
  $recapPrice.innerHTML = `Total price: $${carPrice}`;
}

$buy.addEventListener("click", function () {
  checkForm();
});

function checkForm() {
  let inputTmp = inputValue.value.trim();
  let regex = /^[^\s]+\s[^\s]+$/;
  if (pricingMethod && regex.test(inputTmp) && dateInput.value) {
    $endPage.classList.remove("hidden");
    recapPageContent(selectedCar);
    clearLocalStorage();
  } else {
    alert("incorrect date");
  }
}
$return2.addEventListener("click", () => {
  $endPage.classList.add("hidden");

  for (let i = 0; i < $accItem.length; i++) {
    if ($accItem[i].classList.contains("accItemClicked")) {
      $accItem[i].classList.remove("accItemClicked");
    }
  }
});

// LOCALSTORAGE -----------------
if (localStorage.getItem("form_data")) {
  const formData = JSON.parse(localStorage.getItem("form_data"));
  inputValue.value = formData.nameAndSurname;
  dateInput.value = formData.date;
}

inputValue.addEventListener("input", saveFormData);
dateInput.addEventListener("input", saveFormData);

function saveFormData() {
  const formData = {
    nameAndSurname: inputValue.value,
    date: dateInput.value,
  };
  localStorage.setItem("form_data", JSON.stringify(formData));
}
function clearLocalStorage() {
  localStorage.removeItem("form_data");
  // Resetowanie pól formularza
  inputValue.value = "";
  dateInput.value = "";
}
