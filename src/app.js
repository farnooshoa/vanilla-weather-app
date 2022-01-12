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
function formatDay(timestemp) {
    let date = new Date(timestemp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
}
function displayForcast(response) {
    let forcast = response.data.daily;

    let forcatsElement = document.querySelector("#forcast");

    let forcastHtml = `<div class="row">`;

    forcast.forEach(function (forcastDay, index) {
        if (index < 6) {
            forcastHtml = forcastHtml + `<div class="col-2" >
                            <div id="weather-forcast-date">
                                ${formatDay(forcastDay.dt)}
                            </div>
                            <img src="http://openweathermap.org/img/wn/${forcastDay.weather[0].icon}@2x.png" alt="" width="42"/>
                            <div class="weather-forcast-tem">
                                <span class="weather-forcast-max"> ${Math.round(forcastDay.temp.max)}°</span>
                                <span class="weather-forcast-min"> ${Math.round(forcastDay.temp.min)}°</span>
                            </div>
                        </div>`;
        }
    });



    forcastHtml = forcastHtml + `</div >`;
    forcatsElement.innerHTML = forcastHtml;
}

function getForecast(coordinates) {

    let apiKey = "256a30f9fb5ee55039e6c546147b0e63";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForcast);
}
function displayTemperature(response) {
    let temperatureElement = document.querySelector("#temperature");
    let discriptionElement = document.querySelector("#discription");
    let cityElement = document.querySelector("#city");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");
    celsiusTemperature = response.data.main.temp;
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    discriptionElement.innerHTML = response.data.weather[0].description;
    cityElement.innerHTML = response.data.name;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);

    getForecast(response.data.coord);
}
function search(city) {
    let apiKey = "256a30f9fb5ee55039e6c546147b0e63";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);

}
function handleSubmit(event) {
    event.preventDefault();
    let cityInputlement = document.querySelector("#city-input");
    search(cityInputlement.value);
}


function displayFahrenheitTemperature(event) {
    event.preventDefault();
    let fahrenheitTeperature = (celsiusTemperature * 9) / 5 + 32;
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(fahrenheitTeperature);
}

function displayCelsiusTemperature(event) {
    event.preventDefault();
    fahrenheitLink.classList.remove("active");
    celsiusLink.classList.add("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);

}
let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
search("Paris");
