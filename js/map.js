var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();
    var map;

    function initialize() {
      directionsDisplay = new google.maps.DirectionsRenderer();
      var chicago = new google.maps.LatLng(50.860916, -0.084295);
      var mapOptions = {
        zoom:13,
        center: chicago
      }
      map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
      directionsDisplay.setMap(map);
      var start_auto = document.getElementById('start');
      var end_auto = document.getElementById('end');
      autocomplete = new google.maps.places.Autocomplete(start_auto);
      autocomplete2 = new google.maps.places.Autocomplete(end_auto);
    }

    function calcRoute() {
      var start = document.getElementById("start").value;
      var end = document.getElementById("end").value;
      var request = {
        origin:start,
        destination:end,
        travelMode: google.maps.TravelMode.DRIVING
      };
      directionsService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(result);
        }
      });
    }
    google.maps.event.addDomListener(window, 'load', initialize);
