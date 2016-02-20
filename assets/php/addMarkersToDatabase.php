<?php
	
	include("connectDatabase.php");

	// print_r($_POST); 
	$sql="SELECT id, lat,lng,videoID, activation FROM coordinates WHERE activation = 'no'";
	$records = mysqli_query($con, $sql);

	while($row = mysqli_fetch_assoc($records)){
		$id = $row['id'];
		$lng = $row['lng'];
		$lat = $row['lat'];
		$videoID = $row['videoID'];
		$activation = $row['activation'];

	}
	
	// die();
	if(mysqli_query($con, "INSERT INTO coordinates (lng, lat, videoID, activation) VALUES ('$lng', '$lat','$videoID','no')"))
		// header("Location:http://localhost:8888/");
		echo "Success";
	else
		echo "Insertion Failed";
