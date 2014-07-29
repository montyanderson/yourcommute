<?php
include("mongo.php");
header("Content-type: text/plain");

$cursor = $users->find();
foreach ($cursor as $doc) {
	echo $doc["name"];
	echo PHP_EOL;
}
?>