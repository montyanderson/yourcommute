<?php
ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(-1);

$mongo = new MongoClient();
$db = $mongo->selectDB("yrs2014");
$users = $db->users;
$cars = $db->cars;
?>
