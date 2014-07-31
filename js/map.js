    var directionsDisplay,
    directionsService = new google.maps.DirectionsService(),
    map,
    check_load = false,
    waypts = [],
    check_no_input = true,
    startloc = new google.maps.LatLng(51.5000, 0.1167),
    carbon_p_km = 160,
    kmpg = 30 * 1.609344,
    p_litre = 130;

    function initialize() {
      var mapOptions = {
        zoom:13,
        center: startloc,
        streetViewControl:false
      }
      var rendererOptions = {
        draggable: true
      };
      map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
      directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
      if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(function (position) {
             startloc = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
             map.setCenter(startloc);
         });
     }

      directionsDisplay.setMap(map);

      google.maps.event.addListener(directionsDisplay, 'directions_changed', function() {
        computeTotalDistance(directionsDisplay.getDirections());
      });

      var start_auto = document.getElementById('start');
      var end_auto = document.getElementById('end');
      autocomplete = new google.maps.places.Autocomplete(start_auto);
      autocomplete2 = new google.maps.places.Autocomplete(end_auto);

      google.maps.event.addListener(map,'click',function(event){
        if (check_load == true) {
          var lat = event.latLng.lat();
          var lng = event.latLng.lng();
          waypts.push({
            location:new google.maps.LatLng(lat, lng),
            stopover:true
        });
          calcRoute();
        }
      });

      $(document).ready(function() {
        $(document).keydown(function(e) {
          if (check_no_input == true) {
          var key = e.which
          if (key == 68) {
          waypts = [];
          calcRoute();
        }
        }
        });
        $(".instyle").focus(function(){
          check_no_input = false;
        });
        $(".instyle").focusout(function(){
          check_no_input = true;
      });
      });
    }

    function calcRoute() {
      var start = document.getElementById("start").value,
      end = document.getElementById("end").value,
      transport = document.getElementById("transport").value,
      selector = "#prop";
      $(selector).fadeIn("slow");
      if (transport == "DRIVING") {
        $('.car_only').show("slow");
    } else {
        $('.car_only').hide("slow");
    }
      if (transport == "TRANSIT") {
        check_load = false;
        waypts = [];
      }
      var request = {
        origin:start,
        destination:end,
        travelMode: google.maps.TravelMode[transport],
        waypoints: waypts
      };
      directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
          check_load = true;
        }
      });
    }
    function computeTotalDistance(result) {
      var total = 0;
      var myroute = result.routes[0];
      for (i = 0; i < myroute.legs.length; i++) {
        total += myroute.legs[i].distance.value;
      }
      total = total / 1000.
      var total_co2 = total * carbon_p_km;
      var money_saved = (total / kmpg) * 4.54609 * (p_litre / 100);
      money_saved = Math.floor(money_saved * 100) / 100;
      if (money_saved.toString().length == 3) {
        money_saved = money_saved.toFixed(2);
      }
      document.getElementById("total").innerHTML = total + " km";
      document.getElementById("total_c").innerHTML = total_co2 + " g";
      document.getElementById("money_save").innerHTML = "&pound;" + money_saved;
    }
    google.maps.event.addDomListener(window, 'load', initialize);