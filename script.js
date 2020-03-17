//api-key: AIzaSyAsn-wPrYsLFntG4WLpIGTa6bpdzODDJDQ

// Geolocation functions
var x = document.getElementById("geoLocation");
var userPosition = {
    lat: '',
    lon: ''
};
$(document).ready(function() {
    getLocation();
});

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
    userPosition.lat = position.coords.latitude
    userPosition.lon = position.coords.longitude
    console.log(userPosition.lat, userPosition.lon);
}

// Map functions

$(document).on('click', '#loadMap', function() {
    initMap();
});

var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: userPosition.lat, lng: userPosition.lon},
    zoom: 12
  });
}