<?php
session_start();

ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(-1);

header("Content-type: text/plain");

if($_SESSION["yrs2014-login"] == "true") {} else {
	exit();
}

$url = "http://www.petrolprices.com/feeds/averages.xml";
//$url = "";
$fileContents = file_get_contents($url);

if($fileContents != "") {
	$fileContents = str_replace(array("\n", "\r", "\t"), '', $fileContents);
	$fileContents = trim(str_replace('"', "'", $fileContents));

	$simpleXml = simplexml_load_string($fileContents);
	$json = json_encode($simpleXml);
	$_SESSION["yrs2014-petrol_prices"] = $json;
	header("X-Cached:false");
} else {
	$json = $_SESSION["yrs2014-petrol_prices"];
	header("X-Cached:true");
}

$array = json_decode($json, 1);
$array = $array["Fuel"];

$car_fuel = $_REQUEST["fuel"];

if(strtolower($car_fuel) == "petrol") {
	$car_fuel = "Unleaded";
}

foreach ($array as $fuel_array) {
	$fuel_type = $fuel_array["@attributes"];
	$fuel_type = strtolower($fuel_type["type"]);
	if(strtolower($car_fuel) == strtolower($fuel_type)) {
		$json = json_encode($fuel_array);
		echo $json;
	}
}
