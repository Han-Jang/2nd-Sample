const API_KEY = "67fe3285486a7f123b0fb08665aa9d51";
const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/onecall";

const getWeatherBtn = document.getElementById("get-weather-btn");
getWeatherBtn.addEventListener("click", () => {
    const cityInput = document.getElementById("city-input");
    const cityName = document.getElementById("city-name");
    const weatherIcon = document.getElementById("weather-icon");
    const condition = document.getElementById("condition");
    const details = document.getElementById("details");
    const sunrise = document.getElementById("sunrise");
    const sunset = document.getElementById("sunset");
    const windSpeed = document.getElementById("wind-speed");
    const pressure = document.getElementById("pressure");

    // construct the URL for fetching weather information
    const weatherUrl = `${ WEATHER_URL }?q=${ cityInput.value }&appid=${ API_KEY }`;

    // fetch weather information
    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            cityName.textContent = data.name;
            weatherIcon.src = `https://api.openweathermap.org/img/w/${ data.weather[ 0 ].icon }.png`;
            condition.textContent = data.weather[ 0 ].main;
            details.textContent = data.weather[ 0 ].description;
            sunrise.textContent = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
            sunset.textContent = new Date(data.sys.sunset * 1000).toLocaleTimeString();
            windSpeed.textContent = data.wind.speed;
            pressure.textContent = data.main.pressure;

            // get forecast information
            const lat = data.coord.lat;
            const lon = data.coord.lon;
            const forecastUrl = `${ FORECAST_URL }?lat=${ lat }&lon=${ lon }&exclude=current,minutely,hourly,alerts&appid=${ API_KEY }`;
            return fetch(forecastUrl);
        })
        .then(response => response.json())
        .then(forecastData => {
            const forecastList = document.getElementById("forecast-list");
            forecastList.innerHTML = ""; // clear previous forecast items
            for (let i = 0; i < 7; i++) {
                const forecast = forecastData.daily[ i ];
                
                // create forecast item element
                const forecastItem = document.createElement("li");
                forecastItem.classList.add("forecast-item");
                
                // create and add icon element
                const icon = document.createElement("img");
                icon.classList.add("forecast-icon");
                icon.src = `https://api.openweathermap.org/img/w/${ forecast.weather[ 0 ].icon }.png`;
                forecastItem.appendChild(icon);
                
                // create and add day of week element
                const dayOfWeek = document.createElement("div");
                dayOfWeek.classList.add("forecast-day-of-week");
                dayOfWeek.textContent = new Date(forecast.dt * 1000).toLocaleDateString(undefined, { weekday: 'short' });
                forecastItem.appendChild(dayOfWeek);
                
                // create and add temperature range element
                const tempRange = document.createElement("div");
                tempRange.classList.add("forecast-temp-range");
                tempRange.textContent = `${ Math.round(forecast.temp.min) }°C / ${ Math.round(forecast.temp.max) }°C`;
                forecastItem.appendChild(tempRange);
                
                // add forecast item to the forecast list
                forecastList.appendChild(forecastItem);
            }
        })
        .catch(error => {
            console.log(error);
            alert("An error occurred while fetching weather information.");
        });
})