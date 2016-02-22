<?
error_reporting(E_ALL);
include("connectDatabase.php");


$sql="SELECT id FROM coordinates";
$records = mysqli_query($con, $sql);

while($row = mysqli_fetch_assoc($records)){
	$id = $_GET['id'];
}
	








$update_activation = "DELETE FROM coordinates WHERE id = '$id'";
if(mysqli_query($con, $update_activation))
	header("Location:http://localhost:8888/assets/php/pinConfirmation.php");
else
	echo "Delete Failed";


?>