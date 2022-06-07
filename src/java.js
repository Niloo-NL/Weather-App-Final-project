function displayTemp(response) {
  let temperature = document.querySelector("#temp");
  let cityName = document.querySelector("#city");
  let descriptionInfo = document.querySelector("#description");
  let humidityInfo = document.querySelector("#humidity");
  let windInfo = document.querySelector("#wind");
  console.log(response);
  temperature.innerHTML = Math.round(response.data.main.temp);
  cityName.innerHTML = response.data.name;
  descriptionInfo.innerHTML = response.data.weather[0].description;
  humidityInfo.innerHTML = response.data.main.humidity;
  windInfo.innerHTML = Math.round(response.data.main.wind.speed);
}

let cityName = "Berlin";

let apiKey = "5c245842fe70a2efee1bd472c25f25b9";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemp);
