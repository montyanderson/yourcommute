var car;
var login = false;
var user_pref;
var petrol_price;
var info;
function getPetrolData() {
	$.get('php/fuel_prices.php?fuel=' + car['Fuel Type'], function (response){
		petrol = $.parseJSON(response)
		petrol_price = petrol.Average
	});

}


function startUserPreferences(){
	$('#transport_container').slideDown(1000)

	$('select[name="transport"]').chosen({width: "50%"});
	
	$('select[name="transport"]').on('change', function(evt, params){
		user_select = params.selected

		console.log(user_select);	
		
		
		$('select[name="desired_transport"]').chosen({width: "50%"});
		
		$('#desired_transport_dropdown').slideDown(1000); });

		$('select[name="desired_transport"]').on('change', function(evt2, params2){
			user_second_select = params2.selected
			console.log(user_second_select)
			
			
			user_pref = {
			  "UserTransportPreference" : user_select,
			  "UserSecondaryTransport" : user_second_select
			};

			console.log(user_pref)
			$("#chosen_pref").hide().html('<p>You have chosen to go '+user_select.toLowerCase()+'</p>');
			$("#chosen_pref").hide().append('<p>Your secondary preference is to travel by  '+user_second_select+'</p>');
			$('#transport_container').fadeOut(1000)

			startCarSearch();
		});
}

function startCarSearch(){
			$('#car_container').fadeIn(1000);
			 $.getJSON('php/manufacturers.php', function(data){
					var statusHTML = "<select name = 'cars' data-placeholder='Choose your car make.'>";
					statusHTML+= "<option></option>";
					$.each(data, function(index, manufactures){
						 statusHTML += "<option value=\'"+manufactures+"\'>"+manufactures+"</option>";
					});
					 statusHTML += "</select>";
					$("#car_dropdown").html(statusHTML);
					
					$('select[name=cars]').chosen({width: "50%"});
					
					$('select[name=cars]').on('change', function(evt, params) {
				   		 console.log(params)
				   		 console.log(evt)
				   		 var user_make = params.selected;
				   		 
				   		 $("#chosen_car").hide().html('<p>'+user_make+'</p>');
				   		 
				   		 $.getJSON('php/cars.php?manufacturer='+user_make, function(data){
				   		 	var statusHTML = "<select name = 'model' data-placeholder='Choose your car model.'>";
				   		 	statusHTML+= "<option></option>";
				   		 	
				   		 	$.each(data, function(index, manufacturer){
				   		 		 statusHTML += "<option value=\'"+manufacturer.Model+' '+manufacturer.Description+"\'>"+manufacturer.Model+' '+manufacturer.Description+"</option>";
				   		 	});


			   		 		statusHTML += "</select>"
			   		 		


			   		 		$("#make_dropdown").html(statusHTML);
			   		 		$('select[name=model]').chosen({width: "50%"})

			   		 		$('select[name=model]').on('change', function(evt2, params2) {
							   		 
							   		 var user_model = params2.selected;
							   		 console.log(user_model)
							   		 $("#car_dropdown").fadeOut(1000);
							   		 $("#make_dropdown").fadeOut(1000);
							   		
							   		 $('#car_container').fadeOut(1000);
							   		 $("#car_dropdown").fadeOut(1000);
							   		 $("#chosen_pref").delay(1000).fadeIn(1000)
							   		 $("#chosen_car").hide().append('<p>'+user_model+'</p>').delay(1000).fadeIn(1000);

							   		 $.each(data, function(index, vehicle){
							   		 	console.log(vehicle.Model+vehicle.Description)
										if(vehicle.Model+' '+vehicle.Description === user_model && vehicle.Manufacturer.toLowerCase() === user_make.toLowerCase()){
												
												console.log (vehicle);
								
												car = vehicle; 

												console.log(car)
									
												console.log(car['Fuel Type']);
										
												getPetrolData();

												$('#submit_button').delay(500).fadeIn(1000).click(function(){
													$('#chosen_car, #chosen_pref').fadeOut(1000);
													$('#submit_button').fadeOut(1000);
													$('#map_container').delay(1000).fadeIn(1000)
													initialize();
												})
												

											}
										
										});
									});
							});
						   		 
					});
				
				});
			 }
			 


$(window).load(function(){
		var hash_checker = window.location.hash;
		if (hash_checker){
			console.log('It exists')
			login = true;
			profile();
			
			$('#logon').fadeOut(500, function() {
				$(this).remove();
			});
			
			$("#header").animate({
				'margin-top': 0
			}, 1000, 'swing');
			
			$('#smaller').animate({
				'margin-top': '0.25%'
				 
			},1000, 'swing');
			
			$("#car_wrapper").fadeIn(500);

			startUserPreferences();

			


		
		}
});

var directionsDisplay,
    map,
    check_load = false,
    waypts = [],
    check_no_input = true,
    vol_ballon = 6254.99980497;

function initialize() {

    var mapOptions = {
	    zoom:5,
	    center: new google.maps.LatLng(60.289279, -19.248047),
	    streetViewControl:false
     }
      var rendererOptions = {
        draggable: true
      };
      map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
      directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);

      

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
      google.maps.event.trigger(map, "resize");
    }

    function calcRoute() {
      var directionsService = new google.maps.DirectionsService(),
      start = document.getElementById("start").value,
      end = document.getElementById("end").value,
      selector = "#prop";
      carbon_p_km = car["CO2 g/km"],
      metric_combined = car['Metric Combined'],
      p_litre = petrol_price,
      transport = user_pref.UserTransportPreference;
      $("#prop").fadeIn();
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
      var money_saved = (metric_combined / 100) * total * (p_litre / 100);
      money_saved = money_saved.toFixed(2);
      var total_co2 = total * carbon_p_km,
      ballon_fill = Math.floor((total_co2 * 10) / vol_ballon),
      lattes_per_week = Math.floor((money_saved * 10) / 2.25);
      total_co2 = Math.round(total_co2);
      var trees = Math.round(total_co2 / 59.6504109589);

      info = {
      	"totalKM: ": total,
      	"totalCO2: " : (total_co2/1000) + "KG",
      	"fuelCost: ":  money_saved,
      	"balloonsFilled": ballon_fill,
      	"treeOffset": trees,
      	"lattesPerWeek" : lattes_per_week,
      	"secondaryTransport" : user_pref.UserSecondaryTransport
      }

      $('#KM').html(total)
      $('#CO2').html(total_co2/1000)
      $('#fuelCost').html('&pound'+money_saved)
      $('#balloonsFilled').html(' '+ballon_fill)
      $('#treeOffset').html(' '+trees)
      $('#lattes').html(' '+lattes_per_week+' ')
      $('#secondaryTransport').html(' '+user_pref.UserSecondaryTransport)
  		

      $('#data_button').click(function(){
	    	console.log('clicked');
	    	
	    	$('#map-canvas').addClass('animated bounceOutLeft')
	    	$('#map_container').addClass('animated fadeOut')
	    	$('#map_container').hide();
	    	$('#data_container').css('display', 'block').addClass('animated bounceInRight');

   		 });
      console.log(info)
      
    }

