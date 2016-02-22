<html>
	<head>
		<title>Pin Confirmation</title>
		<script type="text/javascript" src="../js/jquery-2.1.3.min.js"></script>
	</head>
	<body>
		<style type="text/css">
			.pending-acceptance{
				position:relative;
				border:solid;
				border-width:.5;
				margin:10px auto;
			}
			.pending-acceptance p{
				margin:2px;
			}
			.remove-pin-cta{
				position:absolute;
				right:100px;
				top:0;
				width:100px;
				height:100%;
				background:red;
				text-align: center;
				line-height: 5;
				color:white;
				cursor:pointer;
			}
			.acceptance-cta{
				position:absolute;
				right:0;
				top:0;
				width:100px;
				height: 100%;
				background:green;
				text-align: center;
				line-height: 5;
				color:white;
				cursor:pointer;
			}
		</style>

			<?php
				include("connectDatabase.php");
				error_reporting(E_ALL);
				

				$inactive="SELECT id, lat,lng,videoID, activation FROM coordinates WHERE activation = 'no'";
				$records = mysqli_query($con, $inactive);

				while($row = mysqli_fetch_assoc($records)){
					$id = $row['id'];
					$lng = $row['lng'];
					$lat = $row['lat'];
					$videoID = $row['videoID'];
					$activation = $row['activation'];


					echo "<div class='pending-acceptance'>".
						"<p>$id</p>".
						"<p>$lng</p>".
						"<p>".$lat."</p>".
						"<a href=".$videoID.">".$videoID."</a>".
						"<p class='activation'>".$activation."</p>".
						"<a href='removePin.php?id=$id' class='remove-pin-cta'>Delete Pin</a>".
						"<a href='updateConfirmation.php?id=$id&activation=yes' class='acceptance-cta'>Submit</a>".

						"</div>";

				}

			?>
			<script type="text/javascript">
				
				$( document ).ready(function() {
					
				    $(".acceptance-cta").click(function(){
				    	$(this).css({
				    		"background":"darkgrey",
				    		"color":"grey"
				    	});
				    	
				    	
				    	$.post('updateConfirmation.php', function(){
				    		alert("success");
				    	});
				    })
				});
			</script>
	</body>
</html>



