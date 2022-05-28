var DateTime = luxon.DateTime;
var today = DateTime.now();

function getCityWeath(cityName) {
  fetch(
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
      cityName +
      "&limit=1&appid=922375a928fdc33c6466997d7ac7b917"
  );
}
