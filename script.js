function initialize() {
    var mapOptions = {
      center: new google.maps.LatLng(-34.397, 150.644),
      zoom: 18
    };
    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

    updatePosition(function(position) {
        var initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
        map.setCenter(initialLocation);
    });
    setInterval(updatePosition.bind(null, sendPosition), 3000);
}

google.maps.event.addDomListener(window, 'load', initialize);


function updatePosition(callback) {
    navigator.geolocation.getCurrentPosition(callback);
}

function sendPosition(position) {
    var velocity = 0;
    var heading = 0;
    console.log('Updating position', position);
    GpsGate.Server.Hackathon.UpdatePosition(position.coords.latitude, position.coords.longitude, velocity, heading);
}

function ComputeLatLng(vLatitude, vLongitude, vAngle, vDistance) {
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
