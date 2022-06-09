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

function displayTemp(response) {
  let temperature = document.querySelector("#temp");
  let cityName = document.querySelector("#city");
  let descriptionInfo = document.querySelector("#description");
  let humidityInfo = document.querySelector("#humidity");
  let windInfo = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  temperature.innerHTML = Math.round(response.data.main.temp);
  cityName.innerHTML = response.data.name;
  descriptionInfo.innerHTML = response.data.weather[0].description;
  humidityInfo.innerHTML = response.data.main.humidity;
  windInfo.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
}

let cityName = "Berlin";

let apiKey = "5c245842fe70a2efee1bd472c25f25b9";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemp);
