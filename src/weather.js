const API_KEY = "67fe3285486a7f123b0fb08665aa9d51";
const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/onecall";

//variables for the weather codes
let weatherCode = 0;


const getWeatherBtn = document.getElementById("get-weather-btn");
getWeatherBtn.addEventListener("click", () => {
    // get the elements of the document
    const cityInput = document.getElementById("city-input");
    const cityName = document.getElementById("city-name");
    const weatherIcon = document.getElementById("weather-icon");
    const condition = document.getElementById("condition");
    const details = document.getElementById("details");
    const sunrise = document.getElementById("sunrise");
    const sunset = document.getElementById("sunset");
    const windSpeed = document.getElementById("wind-speed");
    const pressure = document.getElementById("pressure");
    const forecastList = document.getElementById("forecast-list");
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
            weatherCode = data.weather[0].id;
            displayClothes(weatherCode);//display clothes based on weather code
            sunrise.textContent = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
            sunset.textContent = new Date(data.sys.sunset * 1000).toLocaleTimeString();
            windSpeed.textContent = data.wind.speed;
            pressure.textContent = data.main.pressure;

            // get forecast information
            const lat = data.coord.lat;
            const lon = data.coord.lon;
            const forecastUrl = `${ FORECAST_URL }?lat=${ lat }&lon=${ lon }&exclude=current,minutely,hourly,alerts&appid=${ API_KEY }&units=metric`;
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
                // tempRange.textContent = `${ Math.round(forecast.temp.min) }°C / ${ Math.round(forecast.temp.max) }°C`;
                tempRange.textContent = `${ forecast.temp.min.toFixed(1) }°C / ${ forecast.temp.max.toFixed(1) }°C`;
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

//make function to display clothes
//taking in the weather code to determine what to display
function displayClothes(weatherCode) {
    //switch statmenet to determine what to display
    switch (weatherCode) {
        case 200:
        case 201:
        case 202:
        case 210:
        case 211:
        case 212:
        case 221:
        case 230:
        case 231:
        case 232:
            document.getElementById("rain").style.display = "block";
            document.getElementById("snow").style.display = "none";
            document.getElementById("sunny").style.display = "none";
            document.getElementById("cloudy").style.display = "none";
            break;
        case 300:
        case 301:
        case 302:
        case 310:
        case 311:
        case 312:
        case 313:
        case 314:
        case 321:
            document.getElementById("rain").style.display = "block";
            document.getElementById("snow").style.display = "none";
            document.getElementById("sunny").style.display = "none";
            document.getElementById("cloudy").style.display = "none";
            break;
        case 500:
        case 501:
        case 502:
        case 503:
        case 504:
        case 511:
        case 520:
        case 521:
        case 522:
        case 531:
            document.getElementById("rain").style.display = "block";
            document.getElementById("snow").style.display = "none";
            document.getElementById("sunny").style.display = "none";
            document.getElementById("cloudy").style.display = "none";
            break;
        case 600:
        case 601:
        case 602:
        case 611:
        case 612:
        case 613:
        case 615:
        case 616:
        case 620:
        case 621:
        case 622:
            document.getElementById("rain").style.display = "none";
            document.getElementById("snow").style.display = "block";
            document.getElementById("sunny").style.display = "none";
            break;
        case 701:
        case 711:
        case 721:
        case 731:
        case 741:
        case 751:
        case 761:
        case 762:
        case 771:
        case 781:
            document.getElementById("rain").style.display = "none";
            document.getElementById("snow").style.display = "none";
            document.getElementById("sunny").style.display = "none";
            document.getElementById("cloudy").style.display = "block";
            break;
        case 800:
            document.getElementById("rain").style.display = "none";
            document.getElementById("snow").style.display = "none";
            document.getElementById("sunny").style.display = "block";
            document.getElementById("cloudy").style.display = "none";
            break;
        case 801:
        case 802:
        case 803:
        case 804:
            document.getElementById("rain").style.display = "none";
            document.getElementById("snow").style.display = "none";
            document.getElementById("sunny").style.display = "none";
            document.getElementById("cloudy").style.display = "block";
            break;
        default:
            document.getElementById("rain").style.display = "none";
            document.getElementById("snow").style.display = "none";
            document.getElementById("sunny").style.display = "none";
            document.getElementById("cloudy").style.display = "none";
            break;
    }
}