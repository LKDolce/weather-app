function formatDate(date) {
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${date.getHours()}`;
  }

  let currentMinute = date.getMinutes();
  if (currentMinute < 10) {
    currentMinute = `0${date.getMinutes()}`;
  }

  let dayIndex = date.getDay();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  let formattedDate = `${day} ${currentHour}:${currentMinute}`;
  return formattedDate;
}
function weatherConditions(response) {
  document.querySelector("#city").innerHTML = `${response.data.name}`;
  document.querySelector("#temperature").innerHTML =
    Math.round(`${response.data.main.temp}`) + "°C";
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML =
    "Wind: " + Math.round(`${response.data.wind.speed}`) + " km/h";
  document.querySelector(
    "#info-weather"
  ).innerHTML = `${response.data.weather[0].main}`;
}

function searchCity(city) {
  let apiKey = `b02cfae02de3053b0adae5c03c2e38dc`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weatherConditions);
}

function typeCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
  console.log(city);
}

function searchLocation(position) {
  var apiKey = "b02cfae02de3053b0adae5c03c2e38dc";
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?lat="
    .concat(position.coords.latitude, "&lon=")
    .concat(position.coords.longitude, "&appid=")
    .concat(apiKey, "&units=metric");
  axios.get(apiUrl).then(weatherConditions);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let dateElement = document.querySelector("#current-date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);
//console.log(formatDate(currentTime));
let form = document.querySelector("form");
form.addEventListener("submit", typeCity);
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
searchCity(city);
