const changeLocation = document.getElementById("change-location");
const card = document.getElementById("card");
const details = document.getElementById("details");
const weatherIcon = document.getElementById("weather-icon");
const overlay = document.getElementById("overlay");
const btnEl = document.getElementById("btn");

changeLocation.city.focus();

// loader

function loader(state) {
  if (state) {
    overlay.classList.remove("d-none");
    new Audio("./sounds/calm-weather.mp3").play();
    new Audio("./sounds/weather-bg-sound.mp3").play();
  } else {
    overlay.classList.add("d-none");
  }
}

//update ui

const updateUI = (weather) => {
  details.innerHTML = `
  <h5 class="mb-3">${weather.name}, ${weather.sys.country} </h5>
          <p class="mb-3">${weather.weather[0].main}</p>
          <div class="display-4 mb-3">
            <span>${Math.round(weather.main.temp)}</span>
            <span>&deg;C</span>
          </div>
  `;

  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }

  weatherIcon.src = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
};

//Get Weather

const getWeather = async (city) => {
  const data = await getData(city);
  return data;
};

//Get Location
changeLocation.addEventListener("submit", (e) => {
  e.preventDefault();
  const cityName = changeLocation.city.value.trim();
  changeLocation.reset();
  getWeather(cityName)
    .then((data) => updateUI(data))
    .catch((err) => {
      if (card.classList.contains("d-none")) {
        card.classList.remove("d-none");
      }
      weatherIcon.src = "./images/sad-emoji.png";
      details.innerHTML = err;
    });
});

btnEl.addEventListener("click", () => {
  new Audio("./sounds/click-sound.wav").play();
});
