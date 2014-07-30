<?php
ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(-1);

include("mongo.php");
header("Content-type: text/plain");
$manufacturer = $_GET["manufacturer"];
$manufacturer = strtoupper($manufacturer);

$models = array();

$cursor = $cars->find(array("Manufacturer"=>$manufacturer));
foreach ($cursor as $doc) {
    $models[] = $doc;
}

$json = json_encode($models);
echo $json;
