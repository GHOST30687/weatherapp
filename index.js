

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput")
const card = document.querySelector(".card")
const apiKey = "d429df295f745de7a214ba543017a92a";

weatherForm.addEventListener("submit", async event => {

    card.style.display = "none";

    event.preventDefault();

    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getWeatherdata(city)
            displayweatherInfo(weatherData)
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError("Please enter a city")
    }

})

async function getWeatherdata(city) {
    
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

    const response = await fetch(apiUrl);

    console.log(response);

    if(!response.ok){
        throw new Error("Could not fetch weather data")
    }

    return await response.json();
}

function displayweatherInfo(data){

    const {name: city,
           main: {temp, humidity},
           weather: [{description, id}]} = data;

           card.textContent = "";
           card.style.display = "flex";

           const cityDisplay = document.createElement("h1");
           const tempDisplay = document.createElement("p");
           const humidityDisplay = document.createElement("p");
           const descDisplay = document.createElement("p");
           const weatherEmoji = document.createElement("p");

           cityDisplay.textContent = city;
           tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
           humidityDisplay.textContent = `Humidity: ${humidity}%`;
           descDisplay.textContent = description;
           weatherEmoji.textContent = getWeatherEmoji(id);


           cityDisplay.classList.add("cityDisplay");
           tempDisplay.classList.add("tempDisplay");
           humidityDisplay.classList.add("humidityDisplay");
           descDisplay.classList.add("descDisplay");
           weatherEmoji.classList.add("getWeatherEmoji");
           



           card.appendChild(cityDisplay);
           card.appendChild(tempDisplay);
           card.appendChild(humidityDisplay);
           card.appendChild(descDisplay);
           card.appendChild(weatherEmoji);

}

function getWeatherEmoji(weatherId) {
    switch (true) {
        case (weatherId >= 200 && weatherId < 300): // Thunderstorm
            return "⛈️";

        case (weatherId >= 300 && weatherId < 400): // Drizzle
            return "🌦️";

        case (weatherId >= 500 && weatherId < 600): // Rain
            return "🌧️";

        case (weatherId >= 600 && weatherId < 700): // Snow
            return "❄️";

        case (weatherId >= 700 && weatherId < 800): // Atmosphere (mist, smoke, etc.)
            return "🌫️";

        case (weatherId === 800): // Clear
            return "☀️";

        case (weatherId > 800 && weatherId < 900): // Clouds
            return "☁️";

        default:
            return "❓"; // fallback emoji
    }
}


function displayError(message){

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay")

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}