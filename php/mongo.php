<?php
$mongo = new MongoClient();
$db = $mongo->selectDB("yrs2014");
$users = $db->users;
$cars = $db->cars;
?>
