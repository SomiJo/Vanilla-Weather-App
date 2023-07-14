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
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = responce.data.city;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = responce.data.condition.description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = responce.data.temperature.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(responce.data.wind.speed);
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formqatDate(responce.data.time * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", responce.data.condition.icon_url);
}
let apiKey = "8a8edboca2bc2t75fa3dfdc820f30444";
let city = "Kabul";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayInformation);
