var login = false;

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
			
		
		}
});