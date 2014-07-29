<?php
session_start();

ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(-1);

include("keys.php");
include(dirname(dirname(__FILE__))."/lib/facebook-php-sdk/src/facebook.php");

$facebook = new Facebook(array(
  'appId'  => $facebook_app_id,
  'secret' => $facebook_app_secret,
));

$user = $facebook->getUser();

if ($user) {
	$profile = $facebook -> api('/me','GET');
	$_SESSION["profile"] = $profile;
	
	include("mongo.php");
	
	$cursor = $users->find($profile);
	$exists = false;

	foreach($cursor as $doc) {
		$exists = true;
	}
	
	$status;	
	
	if($exists == false) {
		$users->insert($profile);
		$status = "New User";
	} else {
		$status = "Old User";	
	}
	
	header("Location: /#login?".$status);
} else {
	$loginUrl = $facebook->getLoginUrl();
	header("Location: ".$loginUrl);
}
?>