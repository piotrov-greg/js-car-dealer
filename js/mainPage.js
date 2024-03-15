const $carListContainer = document.getElementById("carListContainer");
const $carImg = document.getElementById("cardCarImg");
const $brand = document.getElementById("brand");
const $model = document.getElementById("model");
const $engine = document.getElementById("engine");
const $year = document.getElementById("year");
const $mileage = document.getElementById("mileage");
const $price = document.getElementById("pice");

const creatCarItem = function () {
  carList.forEach((car) => {
    const carItem = document.createElement("div");
    carItem.classList.add("carItem");
    const img = document.createElement("img");
    img.src = car.image;
    img.alt = "car img";
    const brandModel = document.createElement("h2");
    brandModel.innerHTML = `${car.brand} <span>${car.model}</span>`;
    const power = document.createElement("p");
    power.innerHTML = `power: <span>${car.engine}</span>`;
    const carYear = document.createElement("p");
    carYear.innerHTML = `year: <span>${car.year}</span>`;
    const mileage = document.createElement("p");
    mileage.innerHTML = `mileage: <span>${car.mileage}</span>`;
    const price = document.createElement("h2");
    price.innerHTML = car.price;
    carItem.appendChild(img);
    carItem.appendChild(brandModel);
    carItem.appendChild(power);
    carItem.appendChild(carYear);
    carItem.appendChild(mileage);
    carItem.appendChild(price);
    $carListContainer.appendChild(carItem);
  });
};
