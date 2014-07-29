$(document).ready(function(){
	$('h1').fitText(0.8);
}); 

$(window).load(function(){
		var hash_checker = window.location.hash;
		if (hash_checker){
			console.log('It exists')
			
			$('#logon').fadeOut(500, function() {
				$(this).remove();
			});
			
			$("#header").animate({
				'margin-top': 0
			}, 1000, 'swing');
			
		
		}
});