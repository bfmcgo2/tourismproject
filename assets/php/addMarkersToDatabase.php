<?php
	
	include("connectDatabase.php");

	// print_r($_POST['lng']); 
	

	$lng = mysqli_real_escape_string($con, $_POST['lng']);
	$lat = mysqli_real_escape_string($con, $_POST['lat']);
	$videoID = mysqli_real_escape_string($con, $_POST['video']);
	$location = mysqli_real_escape_string($con, $_POST['location']);
	$camera = $_POST['cameras'];

	if(mysqli_query($con, "INSERT INTO coordinates (lng, lat, videoID, activation,location,instaID, camera) VALUES ('$lng', '$lat','$videoID','no','$location','216201113', '$camera')"))
		header("Location:http://localhost:8888/");
	else
		echo "Insertion Failed";



	die();
	// if(mysqli_query($con, "INSERT INTO coordinates (lng, lat, videoID, activation,location,instaID) VALUES ('$lng', '$lat','$videoID','no','$location','216201113')"))
	// 	header("Location:http://localhost:8888/");
	// else
	// 	echo "Insertion Failed";

