<?php
session_start();

$car = $_SESSION["car"];
$json = $json_encode($car, 1);
echo $json;
