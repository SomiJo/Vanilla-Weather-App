function formqatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
function displayInformation(responce) {
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(responce.data.temperature.current);
  let cityElement = document.querySelector("#location");
  cityElement.innerHTML = `${responce.data.city}, ${responce.data.country}`;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = responce.data.condition.description;
  let feelslikeElement = document.querySelector("#feels-like");
  feelslikeElement.innerHTML = Math.round(responce.data.temperature.feels_like);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = responce.data.temperature.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(responce.data.wind.speed);
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formqatDate(responce.data.time * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", responce.data.condition.icon_url);

  celsiusTemp = responce.data.temperature.current;
}
function search(city) {
  let apiKey = "8a8edboca2bc2t75fa3dfdc820f30444";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayInformation);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayFarenheitTemp(event) {
  event.preventDefault();
  let farenheitTemp = (celsiusTemp * 9) / 5 + 32;
  celsiusLink.classList.remove("active");
  farenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(farenheitTemp);
}
function displayCelsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  farenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}
let celsiusTemp = null;
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", displayFarenheitTemp);
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

window.onload = function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(searchCurrentLocation);
  }

  function searchCurrentLocation(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    search(latitude, longitude);
  }

  function search(latitude, longitude) {
    let apiKey = "8a8edboca2bc2t75fa3dfdc820f30444";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayInformation);
  }
};
