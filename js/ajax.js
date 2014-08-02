var user;

var new_user = $.cookie('new_user')
console.log(new_user)
function profile() {
	$.ajax({
		url: "php/profile.php",
		success: function(result) {
			user = $.parseJSON(result);
			
			
			if (new_user === true){
				$("#profile-name").text("Welcome to this website, "+user.name);
			}else{
				$("#profile-name").text("Welcome back, "+user.name);
			}
		}
	});
	
	
	
	$("#after-login").fadeIn(1000).css('display', 'block')
	$('h2').fitText(4);
}