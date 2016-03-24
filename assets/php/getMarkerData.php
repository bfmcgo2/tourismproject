<?php
error_reporting(E_ALL);
include("connectDatabase.php");

$sql="SELECT lat,lng,videoID,activation,instaID,location FROM coordinates";


$records = mysqli_query($con,$sql);
$marker_content = array();


	while($row = mysqli_fetch_assoc($records)){
		// $marker_content = $row;
		if($row["activation"]==="yes"){;
			array_push($marker_content, array(
				"coordinates" 	=> array(
					$row["lng"],
					$row["lat"]
				),
				"videoURL" 		=> $row["videoID"],
				"instaID"		=> $row["instaID"],
				"location"		=> $row['location']
			));
		}else{

		}
	}; 

echo json_encode($marker_content);
