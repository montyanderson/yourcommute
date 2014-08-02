<?php
session_start();

ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(-1);

//if($_SESSION["login"]) {
include("mongo.php");

$json = $_REQUEST["car"];
$car = json_decode($json, 1);

$_SESSION["yrs2014-car"] = $car;
//}


//$cursor = $cars->find($car);
//$valid = false;

//foreach ($cursor as $doc) {
//	$valid = true;
//}

//echo "user_car.php: ";
//var_dump($car);
