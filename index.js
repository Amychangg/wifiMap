function initMap(){
    var uluru = {lat: 23.636, lng: 121.044};
    var map = new google.maps.Map(document.getElementById('map'),{
        zoom: 11,
        center: uluru
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
}