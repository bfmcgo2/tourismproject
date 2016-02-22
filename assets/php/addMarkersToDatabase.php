<?php
	
	include("connectDatabase.php");

	// print_r($_POST['lng']); 
	


	$lng = $_POST['lng'];
	$lat = $_POST['lat'];
	$videoID = $_POST['video'];
		
	// die();
	if(mysqli_query($con, "INSERT INTO coordinates (lng, lat, videoID, activation) VALUES ('$lng', '$lat','$videoID','no')"))
		header("Location:http://localhost:8888/");
	else
		echo "Insertion Failed";

