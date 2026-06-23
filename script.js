const searchBtn =
    document.getElementById("searchBtn");

const cityInput =
    document.getElementById("cityInput");

const cityName =
    document.getElementById("cityName");

const temperature =
    document.getElementById("temperature");

const humidity =
    document.getElementById("humidity");

const wind =
    document.getElementById("wind");

const description =
    document.getElementById("description");

const errorMessage =
    document.getElementById("errorMessage");

/* Replace with your API key */
const API_KEY = "YOUR_API_KEY";

/* Fetch Weather */

async function getWeather(city){

    try{

        errorMessage.textContent = "";

        const response =
            await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            );

        if(!response.ok){
            throw new Error(
                "City not found"
            );
        }

        const data =
            await response.json();

        displayWeather(data);

    }
    catch(error){

        cityName.textContent =
            "No Data";

        temperature.textContent="";
        humidity.textContent="";
        wind.textContent="";
        description.textContent="";

        errorMessage.textContent =
            error.message;
    }
}

/* Render Weather Data */

function displayWeather(data){

    cityName.textContent =
        `${data.name}, ${data.sys.country}`;

    temperature.textContent =
        `🌡 Temperature: ${data.main.temp} °C`;

    humidity.textContent =
        `💧 Humidity: ${data.main.humidity}%`;

    wind.textContent =
        `🌬 Wind Speed: ${data.wind.speed} m/s`;

    description.textContent =
        `☁ Weather: ${data.weather[0].description}`;
}

/* Search Button */

searchBtn.addEventListener(
    "click",
    () => {

        const city =
            cityInput.value.trim();

        if(city){
            getWeather(city);
        }
    }
);

/* Enter Key */

cityInput.addEventListener(
    "keypress",
    e => {

        if(e.key === "Enter"){

            const city =
                cityInput.value.trim();

            if(city){
                getWeather(city);
            }
        }
    }
);