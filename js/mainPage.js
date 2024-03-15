const $carListContainer = document.querySelector(".carListContainer");
const $carItem = document.querySelectorAll(".carItem");
const creatCarItem = function () {
  carList.forEach((car) => {
    const carItem = document.createElement("div");
    carItem.classList.add("carItem");
    const imgCar = document.createElement("img");
    imgCar.classList.add("cardCarImg");
    imgCar.src = car.image;
    imgCar.alt = "car img";
    const brandModel = document.createElement("h2");
    brandModel.innerHTML = `${car.brand} <span>${car.model}</span>`;
    const power = document.createElement("p");
    power.innerHTML = `power: <span>${car.power}</span>`;
    const carYear = document.createElement("p");
    carYear.innerHTML = `year: <span>${car.year}</span>`;
    const mileage = document.createElement("p");
    mileage.innerHTML = `mileage: <span>${car.mileage}</span>`;
    const price = document.createElement("h2");
    price.classList.add("price");
    price.innerHTML = car.price;
    carItem.appendChild(imgCar);
    carItem.appendChild(brandModel);
    carItem.appendChild(power);
    carItem.appendChild(carYear);
    carItem.appendChild(mileage);
    carItem.appendChild(price);
    $carListContainer.appendChild(carItem);
  });
};

creatCarItem();
