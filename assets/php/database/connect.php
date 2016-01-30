<?php
error_reporting(E_ALL);

define("DB_HOST", "localhost");
define("DB_USER", "root");
define("DB_PASS", "root");

$host = "localhost";

function query($sql){
	$arr = [];
	// Connect to the database
	$link = mysqli_connect(DB_HOST, DB_USER, DB_PASS, "tourism_project");
	// Run a query on the database
	$result = mysqli_query($link, $sql);
	
	
	if($result){
		while($data = @mysqli_fetch_array($result, MYSQLI_ASSOC)){
			$arr[] = $data;
		}
		return $arr;
	}
	 
	
}
// 
// $result = query("SELECT * FROM brad_customers");
// print_r($result);
// query("INSERT INTO brad_customers (firstname,lastname) VALUES ('James','Gandolfini');");

// UPDATE tablename SET column="value" WHERE row = "another value"
// DELETE FROM tablename WHERE row = "rowvalue"
// DELETE FROM brad_customers WHERE firstname = 'James'
// UPDATE brad_customers SET lastname = "Garfield" WHERE lastname = "Gandolfini"

?>