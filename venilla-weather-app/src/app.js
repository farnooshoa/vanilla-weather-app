function displayTemperature(response) {
    console.log(response.data);
    let temperatureElement = document.querySelector("#temperature");
    let discriptionElement = document.querySelector("#discription");
    let cityElement = document.querySelector("#city");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    discriptionElement.innerHTML = response.data.weather[0].description;
    cityElement.innerHTML = response.data.name;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);

}
let apiKey = "256a30f9fb5ee55039e6c546147b0e63";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);