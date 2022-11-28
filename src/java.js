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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Friday", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
                <div class="col-2">
                  <div class="date-forecast">
                  ${formatDay(forecastDay.dt)}
                </div>
                  <img src="src/img/${
                    forecastDay.weather[0].icon
                  }.svg" width=70px> 
                <div class="forecast-temp">
                  <span class="max-temp">
                    ${Math.round(forecastDay.temp.max)}°
                  </span> |
                  <span  class="min-temp">
                    ${Math.round(forecastDay.temp.min)}°
                  </span>
              </div>
              </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "5c245842fe70a2efee1bd472c25f25b9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function getIcon(response) {}

function displayTemp(response) {
  let temperature = document.querySelector("#temp");
  let cityName = document.querySelector("#city");
  let descriptionInfo = document.querySelector("#description");
  let humidityInfo = document.querySelector("#humidity");
  let windInfo = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");

  celsiusTemp = response.data.main.temp;

  let backgroundImage = document.querySelector("#bg-img");
  let icon = document.querySelector("#icon");

  if (response.data.weather[0].description === "clear sky") {
    icon.setAttribute("src", "src/img/01d.svg");
    icon.setAttribute("alt", "sunny");
    backgroundImage.setAttribute(
      "style",
      `background-image: url(src/img/clearsky.jpg);`
    );
  } else if (
    response.data.weather[0].description === "broken clouds" ||
    "overcast clouds"
  ) {
    icon.setAttribute("src", "src/img/03d.svg");
    icon.setAttribute("alt", "broken-clouds");
    backgroundImage.setAttribute(
      "style",
      `background-image: url(src/img/cloudyday.jpg);`
    );
  } else if (
    response.data.weather[0].description === "few clouds" ||
    "scattered clouds"
  ) {
    icon.setAttribute("src", "src/img/02d.svg");
    icon.setAttribute("alt", "cloudy");
    backgroundImage.setAttribute(
      "style",
      `background-image: url(src/img/clouds.webp);`
    );
  } else if (
    response.data.weather[0].description === "shower rain" ||
    "heavy rain"
  ) {
    icon.setAttribute("src", "src/img/09d.svg");
    icon.setAttribute("alt", "shower-rain");
    backgroundImage.setAttribute(
      "style",
      `background-image: url(src/img/showerrain.jpg);`
    );
  } else if (response.data.weather[0].description === "Light rain" || "rain") {
    icon.setAttribute("src", "src/img/10d.svg");
    icon.setAttribute("alt", "rainy");
    backgroundImage.setAttribute(
      "style",
      `background-image: url(src/img/rain.jpg);`
    );
  } else if (response.data.weather[0].description === "thunderstorm") {
    icon.setAttribute("src", "src/img/11d.svg");
    icon.setAttribute("alt", "thunderstorms");
    backgroundImage.setAttribute(
      "style",
      `background-image: url(src/img/thunderstorm.jpg);`
    );
  } else if (response.data.weather[0].description === "snow") {
    icon.setAttribute("src", "src/img/13d.svg");
    icon.setAttribute("alt", "snowy");
    backgroundImage.setAttribute(
      "style",
      `background-image: url(src/img/snowy.jpg);`
    );
  } else if (response.data.weather[0].description === "mist") {
    icon.setAttribute("src", "src/img/04d.svg");
    icon.setAttribute("alt", "mist");
    backgroundImage.setAttribute(
      "style",
      `background-image: url(src/img/mist.jpg);`
    );
  }
  let date = new Date(response.data.dt * 1000);
  let hours = date.getHours();

  if (
    (response.data.weather[0].description === "clear sky" || "clear") &
    (hours > 20)
  ) {
    icon.setAttribute("src", "src/img/night.svg");
    icon.setAttribute("alt", "night");
    backgroundImage.setAttribute(
      "style",
      `background-image: url(src/img/clearnight.jpg);`
    );
  }
  if (
    (response.data.weather[0].description === "few clouds" ||
      "scattered clouds" ||
      "broken clouds" ||
      "overcast clouds") &
    (hours > 20)
  ) {
    icon.setAttribute("src", "src/img/cloudy-night-2.svg");
    icon.setAttribute("alt", "night cloudy");
    backgroundImage.setAttribute(
      "style",
      `background-image: url(src/img/cloudynight.jpg);`
    );
  }

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
