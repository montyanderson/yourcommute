<?php
session_start();
header("Content-type: text/plain");

$ip = false; 

if($_SERVER['REMOTE_ADDR'] != "") { 
	$ip = $_SERVER['REMOTE_ADDR'];
} else {
	exit();
}

$json = file_get_contents("http://freegeoip.net/json/".$ip);
$array =  json_decode($json, true);
//$array
$json = json_encode($array);
echo $json;
