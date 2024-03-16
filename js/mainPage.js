const $carListContainer = document.querySelector(".carListContainer");
const $costumizePage = document.getElementById("costumizePage");
const $carFilter = document.getElementById("car-filter");
const $return = document.querySelector(".return");

const tooglePage = function () {
  $costumizePage.classList.toggle("hidden");
};

function displayCars(cars) {
  $carListContainer.innerHTML = "";
  cars.forEach((car) => {
    const carDiv = document.createElement("div");
    carDiv.classList.add("carItem");
    carDiv.innerHTML = `
      <img class="cardCarImg" src="${car.image}" alt="${car.brand} ${car.model}">
      <h2>${car.brand} ${car.model}</h2>
      <p>Year: <span>${car.year}<span></p>
      <p>Power: <span>${car.power}</span></p>
      <p>Mileage: <span>${car.mileage}</span></p>
      <h2 class="price"><span>${car.price}<span></h2>
    `;
    carDiv.addEventListener("click", tooglePage);

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

$return.addEventListener("click", tooglePage);
