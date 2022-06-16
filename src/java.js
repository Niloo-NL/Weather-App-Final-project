function timeInfo(timestamp) {
  return "05:00";
}

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = weekDays[date.getDay()];
  return `${day}, ${hours}:${minutes}`;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let forcastDay = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri"];
  forcastDay.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
                <div class="col-2">
                  <div class="date-forecast">
                  ${day}
                </div>
                  <img src="src/img/cloudy-day-2.svg">
                <div class="forecast-temp">
                  <span class="max-temp">
                    19°
                  </span>
                  <span  class="min-temp">
                    12°
                  </span>
              </div>
              </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function nightIconElement(element) {
  let date = new Date();
  let hours = date.getHours();
  if (hours > 20 && element === " clear sky") {
    let icon = document.querySelector("#icon");
    icon.setAttribute("src", "src/img/night.svg");
    icon.setAttribute("alt", "night");
  }
  if ((hours > 20 && element === "few clouds") || "scattered clouds") {
    let icon = document.querySelector("#icon");
    icon.setAttribute("src", "src/img/cloudy-night-1.svg");
    icon.setAttribute("alt", "night-cloudy");
  } else {
  }
}

function getForecast(coordinates) {
  let apiKey = "5c245842fe70a2efee1bd472c25f25b9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemp(response) {
  let temperature = document.querySelector("#temp");
  let cityName = document.querySelector("#city");
  let descriptionInfo = document.querySelector("#description");
  let humidityInfo = document.querySelector("#humidity");
  let windInfo = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");

  celsiusTemp = response.data.main.temp;

  let nightIcon = document.querySelector("#icon");
  nightIcon.innerHTML = nightIconElement(response.data.weather[0].description);
  let backgroundImage = document.querySelector("#bg-img");

  let icon = document.querySelector("#icon");

  if (response.data.weather[0].description === "clear sky") {
    icon.setAttribute("src", "src/img/day.svg");
    icon.setAttribute("alt", "sunny");
    backgroundImage.setAttribute(
      "style",
      `background-image: url(src/img/clouds.webp);`
    );
  } else if (
    response.data.weather[0].description === "broken clouds" ||
    "overcast clouds"
  ) {
    icon.setAttribute("src", "src/img/cloudy.svg");
    icon.setAttribute("alt", "broken-clouds");
    backgroundImage.setAttribute(
      "style",
      `background-image: url(src/img/cloudyday.jpg);`
    );
  } else if (
    response.data.weather[0].description === "few clouds" ||
    "scattered clouds"
  ) {
    icon.setAttribute("src", "src/img/cloudy-day-2.svg");
    icon.setAttribute("alt", "cloudy");
    backgroundImage.setAttribute(
      "style",
      `background-image: url(src/img/clouds.webp);`
    );
  } else if (response.data.weather[0].description === "shower rain") {
    icon.setAttribute("src", "src/img/rainy-6.svg");
    icon.setAttribute("alt", "shower-rain");
  } else if (response.data.weather[0].description === "rain") {
    icon.setAttribute("src", "src/img/rainy-1.svg");
    icon.setAttribute("alt", "rainy");
  } else if (response.data.weather[0].description === "thunderstorm") {
    icon.setAttribute("src", "src/img/thunder.svg");
    icon.setAttribute("alt", "thunderstorms");
    backgroundImage.setAttribute(
      "style",
      `background-image: url(src/img/thunderstorm.jpg);`
    );
  } else if (response.data.weather[0].description === "snow") {
    icon.setAttribute("src", "src/img/snowy-5.svg");
    icon.setAttribute("alt", "snowy");
  } else if (response.data.weather[0].description === "mist") {
    icon.setAttribute("src", "src/img/cloudy.svg");
    icon.setAttribute("alt", "mist");
  } else if (
    (response.data.weather[0].description === "clear sky" || "clear") &
    (hours > 20)
  ) {
    icon.setAttribute("src", "src/img/night.svg");
    icon.setAttribute("alt", "night");
    backgroundImage.setAttribute(
     "style",
     `background-image: url(src/img/clearnight.jpg);`
   );
  }  else if (
   (response.data.weather[0].description === "broken clouds" ||
   "overcast clouds") &
   (hours > 20)
  ) {
    icon.setAttribute("src", "src/img/night.svg");
      icon.setAttribute("alt", "night cloudy");
    backgroundImage.setAttribute(
     "style",
    `background-image: url(src/img/cloudynight.jpg);`
    );

  temperature.innerHTML = Math.round(response.data.main.temp);
  cityName.innerHTML = response.data.name;
  descriptionInfo.innerHTML = response.data.weather[0].description;
  humidityInfo.innerHTML = response.data.main.humidity;
  windInfo.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  getForecast(response.data.coord);
}

function citySearch(cityName) {
  let apiKey = "5c245842fe70a2efee1bd472c25f25b9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}

function citySubmit(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city-input");
  citySearch(cityElement.value);
}
let celsiusTemp = null;

citySearch("Berlin");


function displayFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let tempeElement = document.querySelector("#temp");
  tempeElement.innerHTML = Math.round(fahrenheitTemp);
}

function displaycelciusTemp(event) {
  event.preventDefault();

  fahrenheitLink.classList.remove("active");
  celciusLink.classList.add("active");
  let tempeElement = document.querySelector("#temp");
  tempeElement.innerHTML = Math.round(celsiusTemp);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", citySubmit);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celciusLink = document.querySelector("#celcius");
celciusLink.addEventListener("click", displaycelciusTemp);
