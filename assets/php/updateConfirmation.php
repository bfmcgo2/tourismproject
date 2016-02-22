<?
	error_reporting(E_ALL);
	include("connectDatabase.php");


	$sql="SELECT id, activation FROM coordinates WHERE activation = 'no'";
	$records = mysqli_query($con, $sql);

	while($row = mysqli_fetch_assoc($records)){
		$id = $_GET['id'];
		$activation = $_GET['activation'];

}
	








	$update_activation = "UPDATE coordinates SET activation = '$activation' WHERE id = '$id'";
	if(mysqli_query($con, $update_activation))
		header("Location:http://localhost:8888/assets/php/pinConfirmation.php");
	else
		echo "Update Failed";

