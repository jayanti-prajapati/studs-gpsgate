var map;
function initialize() {
    var mapOptions = {
      center: new google.maps.LatLng(-34.397, 150.644),
      zoom: 18
    };
    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

    updatePosition(function(position) {
        var initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
        map.setCenter(initialLocation);
    });
    setInterval(updatePosition.bind(null, sendPosition), 5000);
}



var markers = [];

function addMarker(lat, lng) {
  var latlngpos = new google.maps.LatLng(lat, lng);
  var marker = new google.maps.Marker({
    position: latlngpos,
    map: map,
    title:"Secret location"
  });
  markers.push(marker)
}

// Sets the map on all markers in the array.
function setAllMap(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setAllMap(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setAllMap(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  markers = [];
}


google.maps.event.addDomListener(window, 'load', initialize);


function updatePosition(callback) {
    navigator.geolocation.getCurrentPosition(callback);
    getLocations();
}

function sendPosition(position) {
    var velocity = 0;
    var heading = 0;
    console.log('Updating position', position);
    GpsGate.Server.Hackathon.UpdatePosition(position.coords.latitude, position.coords.longitude, velocity, heading);
}

function getLocations(){
    navigator.geolocation.getCurrentPosition(function(position){
              // Get some users
      GpsGate.Server.Hackathon.GetNearbyLocations().addCallbacks(
        function(response) {
          deleteMarkers();
          for(var i = 0; i < response.length; i++){
            var location = response[i];
            console.log('Pos: ' + ComputeLatLng(position.coords.latitude, position.coords.longitude, location.heading, location.distance));
            var posarray = ComputeLatLng(position.coords.latitude, position.coords.longitude, location.heading, location.distance/1000);
            addMarker(posarray[0], posarray[1]);
          }
        },
        function(error){}
      );


    });

}



function ComputeLatLng(vLatitude, vLongitude, vAngle, vDistance) {
    // Find


    var vNewLatLng = [];
    vDistance = vDistance / 6371;
    vAngle = ToRad(vAngle);

    var vLat1 = ToRad(vLatitude);
    var vLng1 = ToRad(vLongitude);

    var vNewLat = Math.asin(Math.sin(vLat1) * Math.cos(vDistance) +
                  Math.cos(vLat1) * Math.sin(vDistance) * Math.cos(vAngle));

    var vNewLng = vLng1 + Math.atan2(Math.sin(vAngle) * Math.sin(vDistance) * Math.cos(vLat1),
                          Math.cos(vDistance) - Math.sin(vLat1) * Math.sin(vNewLat));

    if (isNaN(vNewLat) || isNaN(vNewLng)) {
        return null;
    }

    vNewLatLng[0] = ToDeg(vNewLat);
    vNewLatLng[1] = ToDeg(vNewLng);

    return vNewLatLng;
}

function ToRad(vInput) {
    return vInput * Math.PI / 180;
}


function ToDeg(vInput) {
    return vInput * 180 / Math.PI;
}
