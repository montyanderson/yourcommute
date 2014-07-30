$(document).ready(function(){
	console.log("clicked");
	$.getJSON('../json/test.json', function(data){
		var statusHTML = "<ul class = 'cars'>";
		$.each(data, function(index, cars){
			echo (cars.make)
			var statusHTML += "<li>"+cars.make+" : "+cars.model+"</li>"
		});
		var statusHTML += "</ul>";
		console.log(statusHTML);
	});
	
});