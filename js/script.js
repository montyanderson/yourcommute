var login = false;
 function startCarSearch(){
			 $.getJSON('php/manufacturers.php', function(data){
					var statusHTML = "<select name = 'cars'>";
					$.each(data, function(index, manufactures){
						 statusHTML += "<option value=\'"+manufactures+"\'>"+manufactures+"</option>";
					});
					 statusHTML += "</select>";
					$("#car_dropdown").html(statusHTML);
					
					$('select[name=cars]').chosen({width: "100%"});;
					
					$('select[name=cars]').on('change', function(evt, params) {
				   		 console.log(params)
				   		 console.log(evt)
				   		 var user_make = params.selected;
				   		 $("#car_dropdown").fadeOut(1000);
				   		 $("#chosen_car").hide().html('<p>'+user_make+'</p>').fadeIn(1000);
				   		 
				   		 
				   		 $.getJSON('php/cars.php?manufacturer='+user_make, function(data){
				   		 	console.log(data);
			   		 		});
			   		 
					});
				
				});
			 }
$(document).ready(function(){
	$('h1').fitText(0.8);
	$('h2').fitText(3);
	$('#logon').fitText(0.8); //made the button fittext
	$("h3").fitText(7);
}); 

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

			startCarSearch();


		
		}
});