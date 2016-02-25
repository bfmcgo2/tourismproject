<html>
	<head>
		<title>Pin Confirmation</title>
		<script type="text/javascript" src="../js/jquery-2.1.3.min.js"></script>
	</head>
	<body>
		<style type="text/css">
			.pending-acceptance-container{
				width:100%;
				height:auto;
				background:beige;
			}
			h1{
				text-align: center;
			}
			.pending-acceptance{
				position:relative;
				border:solid;
				border-width:.5;
				margin:10px auto;
				padding:30px;
			}
			.pending-acceptance p{
				margin:5px 10px;
				display:inline;
			}
			.remove-pin-cta{
				position:absolute;
				right:0px;
				top:0;
				width:100px;
				height:100%;
				background:red;
				text-align: center;
				line-height: 6;
				color:white;
				cursor:pointer;
				font-family: helvetica;
				text-decoration: none;
			}
			.insta-form{
				position: absolute;
				top:0;
				height:100%;
				width:400px;
				right:100px;
			}
			.insta-form h2{
				font-size: 18px;
				margin:10px 0 0;
			}
			.insta-input{
				margin-top: 10px;
			}
			.acceptance-cta{
				position:absolute;
				right:0px;
				top:0;
				width:100px;
				height: 100%;
				background:green;
				text-align: center;
				line-height: 5;
				color:white;
				cursor:pointer;
				font-family: helvetica;
				font-size: 15px;
			}
			.active-pin-container{
				background: lightblue;
			}

			.active-pin-container .acceptance-cta{
				background:blue;
			}

			.update-cta{
				background:blue;
				position:absolute;
				right:0;
				top:0;
				width:100px;
				height: 100%;
				text-align: center;
				line-height: 5;
				color:white;
				cursor:pointer;
			}
		</style>
		<div class="pending-acceptance-container">
			<h1>Pins Pending</h1>
			<?php
				include("connectDatabase.php");
				error_reporting(E_ALL);
				

				$inactive="SELECT id, lat,lng,videoID, activation, location, instaID FROM coordinates WHERE activation = 'no'";
				$records = mysqli_query($con, $inactive);

				while($row = mysqli_fetch_assoc($records)){
					$id = $row['id'];
					$lng = $row['lng'];
					$lat = $row['lat'];
					$videoID = $row['videoID'];
					$activation = $row['activation'];
					$location = $row['location'];
					$instaID = $row['instaID'];


					echo "<div class='pending-acceptance'>".
							"<p>$id .</p>".
							"<p>$lng</p>".
							"<p>$lat</p>"."<br>".
							"<a href=$videoID>$videoID</a>".
							"<form class='insta-form' action='updateConfirmation.php?id=$id&activation=yes' method='post'>
								<h2>Instagram Location ID:</h2>
								<input class='insta-input' type='text' name='instaID' value='$instaID'>
								<input class='acceptance-cta' type='submit'>
								<input class='location-input' type='text' name='location' value='$location'>
							</form>".
							"<a href='removePin.php?id=$id' class='remove-pin-cta'>Delete Pin</a>".
						"</div>";

				}

			?>
		</div>
		<div class="active-pin-container">
			<h1>Active Pins</h1>
			<?php
				// include("connectDatabase.php");
				// error_reporting(E_ALL);
				

				$active="SELECT id, lat,lng,videoID, activation,instaID,location FROM coordinates WHERE activation = 'yes'";
				$records = mysqli_query($con, $active);

				while($row = mysqli_fetch_assoc($records)){
					$id = $row['id'];
					$lng = $row['lng'];
					$lat = $row['lat'];
					$videoID = $row['videoID'];
					$activation = $row['activation'];
					$instaID = $row['instaID'];
					$location = $row['location'];

					echo "<div class='pending-acceptance'>".
							"<p>$id .</p>".
							"<p>$lng</p>".
							"<p>$lat</p>"."<br>".
							
							"<a href=$videoID>$videoID</a>".

							"<form class='insta-form' action='updateExistingPins.php?id=$id&activation=yes' method='post'>
								<h2>Instagram Location ID:</h2>
								<input class='insta-input' type='text' name='instaID' value='$instaID'>
								<input class='location-input' type='text' name='location' value='$location'>
								<input class='acceptance-cta' type='submit' value='Update'></form>".
							"<a href='removePin.php?id=$id' class='remove-pin-cta'>Delete Pin</a>".
						"</div>";

				}

			?>
		</div>
			<script type="text/javascript">
				
				$( document ).ready(function() {
					
				    $(".acceptance-cta").click(function(){
				    	$(this).css({
				    		"background":"darkgrey",
				    		"color":"grey"
				    	});
				    	
				    	
				    	// $.post('updateConfirmation.php', function(){
				    	// 	alert("success");
				    	// });
				    })
				});
			</script>
	</body>
</html>



