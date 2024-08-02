document.getElementById('weatherForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const city = document.getElementById('cityInput').value;

    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`)
        .then(response => response.json())
        .then(data => {
            if (data.results && data.results.length > 0) {
                const { latitude, longitude } = data.results[0];
                fetchWeather(latitude, longitude, city);
            } else {
                showAlert('City not found');
            }
        })
        .catch(error => {
            console.error('Error fetching location data:', error);
            showAlert('Error fetching location data');
        });
});

function fetchWeather(lat, lon, city) {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
        .then(response => response.json())
        .then(data => {
            const weatherResult = document.getElementById('weatherResult');
            weatherResult.innerHTML = `
                <div class="alert alert-info">
                    <p><strong>City:</strong> ${city}</p>
                    <p><strong>Temperature:</strong> ${data.current_weather.temperature} °C</p>
                    <p><strong>Weather:</strong> ${data.current_weather.weathercode}</p>
                </div>
            `;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            showAlert('Error fetching weather data');
        });
}

function showAlert(message) {
    const weatherResult = document.getElementById('weatherResult');
    weatherResult.innerHTML = `
        <div class="alert alert-danger">
            ${message}
        </div>
    `;
}
