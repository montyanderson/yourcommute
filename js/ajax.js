var user;

function profile() {
	$.ajax({
		url: "php/profile.php",
		success: function(result) {
			user = JSON.parse(result);
			$("#profile-name").text(user.name);
			$("#profile-picture").css("background", "url(https://graph.facebook.com/" + user.id + "/picture?type=large)");
		}
	});
	
	$("#truck").css({
		"display" : "none"
	})
	
	$("#header").css({
		"margin-bottom": "4em"	
	});
	
	$("#post-login").css({
		"display":"inline-block"	
	});
	
	$('h2').fitText(3);
}