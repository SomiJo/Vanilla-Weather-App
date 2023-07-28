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
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function displayForecast(responce) {
  let forecast = responce.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
        <div class="weather-forecast-date">
            ${formatDay(forecastDay.time)}
                </div>
                     <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                       forecastDay.condition.icon
                     }" alt="${
          forecastDay.condition.icon
        }" id="icon" width="40px" />
                        <div class="weather-forecast-temperature">
                            <span class="weather-forecast-temperature-max">${Math.round(
                              forecastDay.temperature.maximum
                            )}°</span>
                             <span class="weather-forecast-temperature-min"> ${Math.round(
                               forecastDay.temperature.minimum
                             )}°</span>
                        </div>
         </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "8a8edboca2bc2t75fa3dfdc820f30444";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
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

  getForecast(responce.data.coordinates);
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

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

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
