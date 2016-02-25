<?
	error_reporting(E_ALL);
	include("connectDatabase.php");


	$sql="SELECT id, activation FROM coordinates WHERE activation = 'yes'";
	$records = mysqli_query($con, $sql);

	while($row = mysqli_fetch_assoc($records)){
		$id = $_GET['id'];
		$activation = $_GET['activation'];
		// $instaID = $_GET['instaID'];

	}
	
	$instaID = $_POST['instaID'];
	$location = $_POST['location'];

	




	$update_activation = "UPDATE coordinates SET activation = '$activation', instaID = '$instaID', location = '$location' WHERE id = '$id'";
	if(mysqli_query($con, $update_activation))
		header("Location:http://localhost:8888/assets/php/pinConfirmation.php");
	else
		echo "Update Failed";
