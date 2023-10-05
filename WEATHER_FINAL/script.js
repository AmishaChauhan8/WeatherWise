// Weather App Object
let weather = {
  // API Key for OpenWeatherMap
  apiKey: "e20e29f45adf33e19e59fa705b0aeccd",

  // Fetch weather data from the API
  fetchWeather: function (city) {
    const apiUrl =
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },

  // Display weather information on the webpage
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity, feels_like } = data.main;
    const { speed } = data.wind;

    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      `https://openweathermap.org/img/wn/${icon}.png`;
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".feels_like").innerText = " " + feels_like + "°C";
    document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      `url('https://source.unsplash.com/1600x900/?${name}')`;
  },

  // Search for weather based on user input
  search: function () {
    const city = document.querySelector(".search-bar").value;
    this.fetchWeather(city);
  },
};

// Event listener for the search button
document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

// Event listener for the Enter key in the search input field
document.querySelector(".search-bar").addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    weather.search();
  }
});

// Fetch the default weather for "Ahmedabad" when the page loads
weather.fetchWeather("new york");
