var DateTime = luxon.DateTime;
var today = DateTime.now();

function getCityWeath(cityName) {
  fetch(
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
      cityName +
      "&limit=1&appid=922375a928fdc33c6466997d7ac7b917"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      $("#city").text(data[0].name);
      saveSearch(data[0].name);
      loadSearches();
      $("#date").text(today.toLocaleString(DateTime.DATE_HUGE));
      fetch(
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          data[0].lat +
          "&lon=" +
          data[0].lon +
          "&exclude=minutely,hourly&units=metric&appid=922375a928fdc33c6466997d7ac7b917"
      ).then(function (response) {
        response.json().then(function (data) {
          // current weather
          $("#current-icon").html(
            "<img src='http://openweathermap.org/img/wn/" +
              data.current.weather[0].icon +
              "@2x.png'>"
          );
          $("#current-temp").text("Temperature: " + data.current.temp + " °C");
          $("#current-wind").text(
            "Wind Speed: " + data.current.wind_speed + "m/s"
          );
          $("#current-humidity").text(
            "Humidity: " + data.current.humidity + "%"
          );
          $("#current-uv").text(data.current.uvi);
          // UV Index
          if (data.current.uvi < 2) {
            $("#current-uv").addClass("is-primary");
          } else if (data.current.uvi < 7) {
            $("#current-uv").addClass("is-warning");
          } else {
            $("#current-uv").addClass("is-danger");
          }
          // future weather
          for (let i = 1; i < 6; i++) {
            $("#date-" + i).text(
              today.plus({ days: i }).toLocaleString(DateTime.DATE_HUGE)
            );
            $("#icon-" + i).html(
              "<img src='http://openweathermap.org/img/wn/" +
                data.daily[i].weather[0].icon +
                "@2x.png'>"
            );
            $("#temp-" + i).text("Temp: " + data.daily[i].temp.day + " °C");
            $("#wind-" + i).text("Wind: " + data.daily[i].wind_speed + "m/s");
            $("#humi-" + i).text("Humidity: " + data.daily[i].humidity + "%");
          }
        });
      });
    })
    .catch(function () {
      $("#error-modal").addClass("is-active");
    });
}
