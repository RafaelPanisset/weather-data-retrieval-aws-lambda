document.addEventListener("DOMContentLoaded", function () {
  // Get references to the HTML elements
  const locationInput = document.getElementById("location");
  const searchButton = document.getElementById("search-button");
  const weatherResult = document.getElementById("weather-result");

  // Add a click event listener to the search button
  searchButton.addEventListener("click", function () {
    // Get the location value entered by the user
    const location = locationInput.value;

    // Create the API endpoint URL
    const apiUrl = `https://m4p589wh98.execute-api.us-east-1.amazonaws.com/dev/weather?location=${location}`;

    // Make a GET request to the API
    fetch(apiUrl)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch data");
        }
      })
      .then((data) => {
        // Display the weather data on the page
        weatherResult.innerHTML = `
          <p>Localização: ${data.location}</p>
          <p>Descrição: ${data.description}</p>
          <p>Temperatura: ${data.temperature} °C</p>
          <p>Umidade: ${data.humidity} %</p>
        `;
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
        weatherResult.innerHTML = "Erro ao buscar os dados do clima.";
      });
  });
});
