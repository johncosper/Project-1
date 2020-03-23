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
    userPosition.lat = position.coords.latitude;
    userPosition.lon = position.coords.longitude;
    console.log(userPosition.lat, userPosition.lon);
    var load = document.getElementById('ready');
    load.innerHTML = 'Latitude: ' + userPosition.lat.toFixed(2) + ' Longitude: ' + userPosition.lon.toFixed(2) + '';

};

// Map functions

$(document).on('click', '#get-geolocation', function () {
  initMap();
})

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      mapTypeControl: false,
      center: {lat: userPosition.lat, lng: userPosition.lon},
      zoom: 13
    });

    var marker = new google.maps.Marker( {
        position: {lat: userPosition.lat, lng: userPosition.lon},
        map: map,
        title: 'User Location'
    });
  
    new AutocompleteDirectionsHandler(map);
}
  
  /**
   * @constructor
   */
  function AutocompleteDirectionsHandler(map) {
    this.map = map;
    this.originPlaceId = null;
    this.destinationPlaceId = null;
    this.travelMode = 'WALKING';
    this.directionsService = new google.maps.DirectionsService;
    this.directionsRenderer = new google.maps.DirectionsRenderer;
    this.directionsRenderer.setMap(map);
  
    var originInput = document.getElementById('origin-input');
    var destinationInput = document.getElementById('destination-input');
    var modeSelector = document.getElementById('mode-selector');
  
    var originAutocomplete = new google.maps.places.Autocomplete(originInput);
    // Specify just the place data fields that you need.
    originAutocomplete.setFields(['place_id']);
  
    var destinationAutocomplete =
        new google.maps.places.Autocomplete(destinationInput);
    // Specify just the place data fields that you need.
    destinationAutocomplete.setFields(['place_id']);
  
    this.setupClickListener('changemode-walking', 'WALKING');
    this.setupClickListener('changemode-transit', 'TRANSIT');
    this.setupClickListener('changemode-driving', 'DRIVING');
  
    this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
    this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');
  
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(
        destinationInput);
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(modeSelector);
  }
  
  // Sets a listener on a radio button to change the filter type on Places
  // Autocomplete.
  AutocompleteDirectionsHandler.prototype.setupClickListener = function(
      id, mode) {
    var radioButton = document.getElementById(id);
    var me = this;
  
    radioButton.addEventListener('click', function() {
      me.travelMode = mode;
      me.route();
    });
  };
  
  AutocompleteDirectionsHandler.prototype.setupPlaceChangedListener = function(
      autocomplete, mode) {
    var me = this;
    autocomplete.bindTo('bounds', this.map);
  
    autocomplete.addListener('place_changed', function() {
      var place = autocomplete.getPlace();
  
      if (!place.place_id) {
        window.alert('Please select an option from the dropdown list.');
        return;
      }
      if (mode === 'ORIG') {
        me.originPlaceId = place.place_id;
      } else {
        me.destinationPlaceId = place.place_id;
      }
      me.route();
    });
  };
  
  AutocompleteDirectionsHandler.prototype.route = function() {
    if (!this.originPlaceId || !this.destinationPlaceId) {
      return;
    }
    var me = this;
  
    this.directionsService.route(
        {
          origin: {'placeId': this.originPlaceId},
          destination: {'placeId': this.destinationPlaceId},
          travelMode: this.travelMode
        },
        function(response, status) {
          if (status === 'OK') {
            me.directionsRenderer.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
  };

  $(document).on('click', '#weather-search-button', function() {
    getWeather();
})

  function getWeather() {

    var key = "f15fc9d302b52500afaf375cf7812bcf";
    var url = "https://api.openweathermap.org/data/2.5/forecast";
    $.ajax ({
        url: url,
        dataType: "json",
        type: "GET",
        data: {
          lat: userPosition.lat,
          lon: userPosition.lon,
          appid: key,
          units: "imperial",
          cnt: "1"
        },
        success: function(data) {
          console.log('Received data:', data)
          var weatherForcast = "";
          weatherForcast += "<h2>" + data.city.name + "</h2>";
          $.each(data.list, function(index, val) {
              weatherForcast += "<p>"
              weatherForcast += val.main.temp + "&degF |"
              weatherForcast += ' wind speed: ' + val.wind.speed + 'mph |'
              weatherForcast += ' humidity: ' + val.main.humidity + '%'
              weatherForcast += "<span> | " + val.weather[0].description + "</span>";
              weatherForcast += "<img src='https://openweathermap.org/img/w/" + val.weather[0].icon + ".png'>"
              weatherForcast += "</p>"
          });
          $("#showWeatherForcast").html(weatherForcast);
          
        }
      });

};


$(document).on('click', '#Music', function() {
  getMusic();
})

function getMusic() {
  
  var artist = $('#artist-search').val();
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://deezerdevs-deezer.p.rapidapi.com/artist/" + artist + '',
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
      "x-rapidapi-key": "a5e91296f3mshd9d2d514da719a0p153f54jsn03a6c7bb3fab"
    }
  }

  $.ajax(settings).done(function (data) {
    
    console.log('Received data:', data)
    var MusicData = "";
    MusicData += "<h2>" + data.name + "</h2>";
        MusicData += "<p>"
        MusicData += '<img src=' + data.picture_medium + '';
        MusicData += " </p>"
        MusicData += "<h4>"
        MusicData += '<a href=' + data.link + ' target=_blank>' + 'View Tracks' + '</a>'
        MusicData += ' </h4>'
    $("#showMusicData").html(MusicData);

  });
};





