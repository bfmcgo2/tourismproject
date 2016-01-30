<?php 
 // connection
$con = mysql_connect('localhost','root','root');
if(!$con){
	die("Can not connect ". mysql_error());
}
// selecting database
mysql_select_db('tourism_project', $con);

$sql="SELECT lat,lng FROM coordinates";

$records = mysql_query($sql);
$coordinates = [];

while($row = mysql_fetch_assoc($records)){
	$coordinates[] = $row;
}; 

echo json_encode($coordinates);


?>



