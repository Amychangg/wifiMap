
let map, infoWindow;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 23.636, lng: 121.044},
    zoom: 8,
    });
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState===4 && xhr.status===200){
            var data = JSON.parse(xhr.responseText);
            console.log(data);
            data.forEach(function(value,index){
                var lat = value.LATITUDE;
                var lng = value.LONGITUDE;
                var latLng = new google.maps.LatLng(lat,lng);
                var marker = new google.maps.Marker({
                    position: latLng,
                    map: map
                });
                var contentString = '<div>'+ value.NAME + '</div><div>'+ value.ADDR + '</div>';
                var infowindow = new google.maps.InfoWindow({content: contentString,});
                marker.addListener("click",function(){
                    infowindow.open(map,marker);
                    console.log('click');
                });
            });
        }
    };
    xhr.open('GET','itw_tw.json',true);
    xhr.send();
    
    infoWindow = new google.maps.InfoWindow();

    const locationButton = document.createElement("button");

    locationButton.textContent = "Pan to Current Location";
    locationButton.classList.add("custom-map-control-button");
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
    locationButton.addEventListener("click", () => {
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };

                infoWindow.setPosition(pos);
                infoWindow.setContent("Location found.");
                infoWindow.open(map);
                map.setCenter(pos);
                },
                () => {
                handleLocationError(true, infoWindow, map.getCenter());
                }
            );
        } else {
            handleLocationError(false, infoWindow, map.getCenter());
        }
    });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
        browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
  infoWindow.open(map);
}

window.initMap = initMap;