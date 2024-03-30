const API_KEY = "23f3091fd09f13f57f14a0ac230cee5c";

function searchCity(city) {
  // Make an API call to retrieve the latitude and longitude of the specified city
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
      // Extract the latitude and longitude from the API response
      const { lat, lon } = data.coord;

      // Make another API call to retrieve the 5-day forecast using the latitude and longitude
      fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
        .then(response => response.json())
        .then(forecastData => {
          // Process the retrieved forecast data and display the 5-day forecast for the city
          displayForecast(city, forecastData);
        })
        .catch(error => {
          console.error("Error retrieving forecast data:", error);
        });
    })
    .catch(error => {
      console.error("Error retrieving city data:", error);
    });
  
  function displayForecast(city, forecastData) {
    // Get the container element to display the forecast cards
    const forecastContainer = document.getElementById("forecast-container");

    // Clear any existing forecast cards
    forecastContainer.innerHTML = "";

    // Create a card for each day in the forecast data
    forecastData.list.forEach(day => {
      // Extract the date, weather conditions, high temperature, and low temperature for the day
      const date = new Date(day.dt * 1000).toLocaleDateString();
      const conditions = day.weather[0].description;
      const highTemp = day.main.temp_max;
      const lowTemp = day.main.temp_min;

      // Create a card element
      const card = document.createElement("div");
      card.classList.add("card");

      // Create the card content
      const cardContent = `
        <h3>${city}</h3>
        <p>Date: ${date}</p>
        <p>Conditions: ${conditions}</p>
        <p>High Temperature: ${highTemp}°C</p>
        <p>Low Temperature: ${lowTemp}°C</p>
      `;

      // Set the card content
      card.innerHTML = cardContent;

      // Append the card to the forecast container
      forecastContainer.appendChild(card);
    });
  }
}

function displayPreviousSearches(searches) {
  // Get the container element to display the previous searches
  const previousSearchesContainer = document.getElementById("previous-searches");

  // Clear any existing previous searches
  previousSearchesContainer.innerHTML = "";

  // Create a list element for each search in the searches array
  searches.forEach(search => {
    // Create a list item element
    const listItem = document.createElement("li");

    // Set the text content of the list item to the search
    listItem.textContent = search;

    // Append the list item to the previous searches container
    previousSearchesContainer.appendChild(listItem);
  });
}


// Call the searchCity function with the specified city
searchCity();

// Call the displayPreviousSearches function with the specified searches
displayPreviousSearches();

