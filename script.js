//api-key: AIzaSyAsn-wPrYsLFntG4WLpIGTa6bpdzODDJDQ

var x = document.getElementById("geoLocation");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
    var x = document.getElementById("geoLocation");
    x.innerHTML = "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude;
}

$(document).on('click', '#getGeolocation', function() {
    console.log('clicked')
    getLocation();
})