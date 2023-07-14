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
}
let apiKey = "8a8edboca2bc2t75fa3dfdc820f30444";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Lisbon&key=${apiKey}&units=metric`;
console.log(apiUrl);
axios.get(apiUrl).then(displayInformation);
