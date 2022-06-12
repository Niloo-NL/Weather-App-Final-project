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
  let icon = document.querySelector("#icon");

  if (response.data.weather[0].description === " clear sky") {
    icon.setAttribute("src", "src/img/day.svg");
    icon.setAttribute("alt", "sunny");
  }
  if (response.data.weather[0].description === "broken clouds") {
    icon.setAttribute("src", "src/img/cloudy.svg");
    icon.setAttribute("alt", "broken-clouds");
  }
  if (
    response.data.weather[0].description === "few clouds" ||
    "scattered clouds"
  ) {
    icon.setAttribute("src", "src/img/cloudy-day-2.svg");
    icon.setAttribute("alt", "cloudy");
  }
  if (response.data.weather[0].description === "shower rain") {
    icon.setAttribute("src", "src/img/rainy-6.svg");
    icon.setAttribute("alt", "shower-rain");
  }
  if (response.data.weather[0].description === "rain") {
    icon.setAttribute("src", "src/img/rainy-1.svg");
    icon.setAttribute("alt", "rainy");
  }
  if (response.data.weather[0].description === "thunderstorm") {
    icon.setAttribute("src", "src/img/thunder.svg");
    icon.setAttribute("alt", "thunderstorm");
  }
  if (response.data.weather[0].description === "snow") {
    icon.setAttribute("src", "src/img/snowy-5.svg");
    icon.setAttribute("alt", "snowy");
  }
  if (response.data.weather[0].description === "mist") {
    icon.setAttribute("src", "src/img/cloudy.svg");
    icon.setAttribute("alt", "mist");
  }
  console.log(response);
  temperature.innerHTML = Math.round(response.data.main.temp);
  cityName.innerHTML = response.data.name;
  descriptionInfo.innerHTML = response.data.weather[0].description;
  humidityInfo.innerHTML = response.data.main.humidity;
  windInfo.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
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
