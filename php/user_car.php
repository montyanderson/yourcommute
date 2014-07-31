<?php
ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(-1);

include("mongo.php");

$json = $_REQUEST["car"];
$car = json_decode($json, 1);

$cursor = $cars->find($car);
$valid = false;

foreach ($cursor as $doc) {
	$valid = true;
}

var_dump($valid);
