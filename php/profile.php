<?php
include("debug.php");
session_start();

$json = json_encode($_SESSION["profile"]);
echo $json;
?>