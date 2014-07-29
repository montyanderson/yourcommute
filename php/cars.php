<?php
header("Content-type: text/plain");
include("mongo.php");
$cursor = $cars->find();
foreach ($cursor as $doc) {
	echo var_dump($doc);
}
?>
