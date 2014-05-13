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
