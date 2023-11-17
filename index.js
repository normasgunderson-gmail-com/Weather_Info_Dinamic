const weatherApiKey  = "f1b50e4de23a4256fa5d69e5980c5ff0";
const weatherDataEl = document.getElementById("weather-data");
const cityInputEl = document.getElementById("city-input");
const formEl = document.querySelector("form");

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityValue = cityInputEl.value;
  getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
  try {
    const response = await fetch(`gi/data/2.5/weather?q=${cityValue}&appid=${weatherApiKey}&units=metric`);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json()
    const temperature = Math.round(data.main.temp)
    const description = data.weather[0].description
    const icon = data.weather[0].icon
    const details = [
      `Feels like: ${Math.round(data.main.feels_like)}`,
      `Humidity: ${data.main.humidity}%`,
      `Wind speed: ${data.wind.speed}m/s`
    ];
      weatherDataEl.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon" >`;
      weatherDataEl.querySelector(".temperature").textContent = `${temperature}°F`
      weatherDataEl.querySelector(".description").textContent = description;
      weatherDataEl.querySelector(".details").innerHTML = details.map((detail) => `<div>${detail}</div>`).join("");
  } catch (error) {
      weatherDataEl.querySelector(".icon").innerHTML = "";
      weatherDataEl.querySelector(".temperature").textContent = "";
      weatherDataEl.querySelector(".description").textContent = "Wait for a change of weather <;-)";
      weatherDataEl.querySelector(".details").innerHTML = "";
    }
  }