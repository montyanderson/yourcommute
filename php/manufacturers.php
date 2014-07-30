<?php
ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(-1);

header("Content-type: text/plain");

include("mongo.php");

$Manufacturers = array();

$cursor = $cars->find();

foreach ($cursor as $doc) {
	if(isset($doc["Manufacturers"]) && !empty($doc["Manufacturers"])) {
	$Manufacturers[] = $doc["Manufacturers"];
	}
	if(isset($doc["Manufacturer"])) {
	$Manufacturers[] = $doc["Manufacturer"];
	}  
}

$Manufacturers = array_unique($Manufacturers);  //Remove all duplicates 
$Manufacturers = array_values($Manufacturers);  //Reset  integers
$Manufacturers = array_map("strtolower", $Manufacturers);  //Make all lower case
$Manufacturers = array_map("ucwords", $Manufacturers); //Capitalize first letter
$Manufacturers = array_filter($Manufacturers); //Remove any blanks
sort($Manufacturers);

echo json_encode($Manufacturers);
