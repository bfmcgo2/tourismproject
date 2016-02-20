<?

 // connection
$con = mysqli_connect('localhost','root','root');
if(!$con){
	die("Can not connect ". mysql_error());
}
// selecting database
mysqli_select_db($con,'tourism_project');


