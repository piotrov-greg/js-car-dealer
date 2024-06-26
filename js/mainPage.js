const $carListContainer = document.querySelector(".carListContainer");
const $mainPage = document.querySelector(".container");
const $costumizePage = document.getElementById("costumizePage");
const $carFilter = document.getElementById("car-filter");
const $return1 = document.getElementById("return1");
const $return2 = document.getElementById("return2");
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
const $navbarIcons = document.querySelector(".navbarIcons");
const $alert = document.getElementById("alert");

let carPrice;
let selectedCar = {
  img: "",
  make: "",
  model: "",
};

function showHide(show, hide) {
  show.classList.remove("hidden");
  hide.classList.add("hidden");
}

function resetAccessories() {
  for (let i = 0; i < $accItem.length; i++) {
    if ($accItem[i].classList.contains("accItemClicked")) {
      $accItem[i].classList.remove("accItemClicked");
    }
  }
}

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
      showHide($costumizePage, $mainPage);
      showHide($return1, $navbarIcons);
      $customImg.src = `${car.image}`;
      $customMake.innerText = `${car.brand} ${car.model}`;
      $customYear.innerText = `${car.year}`;
      $customHp.innerText = `${car.power}`;
      $customMileage.innerText = `${car.mileage}`;
      $customPrice.innerText = `$${car.price}`;
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

$return1.addEventListener("click", () => {
  showHide($mainPage, $costumizePage);
  showHide($navbarIcons, $return1);
  resetAccessories();
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
dateInput.setAttribute("max", minimalDate);

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
  $recapName.innerText = `${inputValue.value}, thank you for purchasing the ${selectedCar.make} ${selectedCar.model}`;
  $recapPayment.innerText = `Payment method: ${selectedSpanContent}`;
  $recapDate.innerText = `Delivery date: ${dateInput.value}`;
  $recapPrice.innerText = `Total price: $${carPrice}`;
}

$buy.addEventListener("click", checkForm);

function checkForm() {
  let inputTmp = inputValue.value.trim().split(" ");
  if (pricingMethod && inputTmp.length === 2 && dateInput.value) {
    showHide($endPage, $costumizePage);
    showHide($return2, $return1);
    recapPageContent(selectedCar);
    clearLocalStorage();
  } else {
    $alert.classList.remove("hidden");
    setTimeout(function () {
      $alert.classList.add("hidden");
    }, 1500);
  }
}
$return2.addEventListener("click", () => {
  showHide($costumizePage, $endPage);
  showHide($return1, $return2);
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
