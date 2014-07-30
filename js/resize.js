function onresize() {
	$("#post-login").width($("h1").width());
	$("#post-login").css({
		"margin-left": (($(document).width() - $("#post-login").width()) / 2) + ($(document).width() / 14)
	});
}

$(window).load(function() {
	onresize();
});

$(document).ready(function() {
	onresize();
});

$(window).resize(function() {
	onresize();
});
