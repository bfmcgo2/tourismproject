<?php
 error_reporting(E_ALL);

?>

<!DOCTYPE html>
<html>
	<head>
		<title></title>
		<meta charset="utf-8">
		<meta name= "viewport" content="width=device-width, initial-scale=1">
		<link rel="stylesheet" type="text/css" href="assets/sass/normalize.css">
		<link rel="stylesheet" type="text/css" href="assets/sass/style.css">
		<link href='https://fonts.googleapis.com/css?family=Montserrat:400,700' rel='stylesheet' type='text/css'>
		<script type="text/javascript" src="assets/js/jquery-2.1.3.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.2/TweenMax.min.js"></script>
		<script type="text/javascript" src="assets/js/snap.svg.js"></script>
		<script type="text/javascript" src="assets/js/DrawSVGPlugin.min.js"></script>
		<script type="text/javascript" src="assets/js/MorphSVGPlugin.min.js"></script>
		<script type="text/javascript" src="assets/js/us-map-svg.js"></script>
		<script type="text/javascript" src="assets/js/jquery.easing.js"></script>
		<script src='https://api.tiles.mapbox.com/mapbox-gl-js/v0.12.4/mapbox-gl.js'></script>
		<link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.12.4/mapbox-gl.css' rel='stylesheet' />
		<script src='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v0.1.0/mapbox-gl-geocoder.js'></script>
		<link rel='stylesheet' href='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v0.1.0/mapbox-gl-geocoder.css' type='text/css' />

		
	</head>
	<body>
		<div class="landing-page-container">
			<div id="steamboat-landing-page">
				<div class="steamboat-logo">
				</div>
				<div class="steamboat-landing-content">
					<h2>Explore Steamboat Springs by using our interactive map.</h2>
					<p>See all that Steamboat has to offer through user-generated videos.</p>
				</div>
				<div class="how-it-works-cta">HOW IT WORKS</div>
				<div class="landing-map-cta">GET STARTED</div>
			</div>
			<div class="info-landing-page">
				<div class="steamboat-logo"></div>
				<div class="info-content-container">
					<div class="info-content">
						<div class="user-pin"></div>
						<h3>EXPLORE THE PINS</h3>
						<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
						tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
						quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
						consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
						cillum dolore eu fugiat nulla pariatur.
						</p>
						
					</div>
					<div class="info-content">
						<div class="camera-pin"></div>
						<h3>CREATE CONTENT</h3>
						<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
						tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
						quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
						consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
						cillum dolore eu fugiat nulla pariatur.
						</p>
					</div>
					<div class="info-content custom">
						<div class="custom-pin"></div>
						<h3>OWN A BUSINESS?</h3>
						<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
						tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
						quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
						consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
						cillum dolore eu fugiat nulla pariatur.
						</p>
					</div>
				</div>
				<div class="landing-map-cta">GET STARTED</div>
			</div>
		</div>
		<div id="map-container">
			<div class="add-pin-cta">
				<h3>
					Add Pin!
				</h3>
			</div>
			<div class="add-content-form">
				<form id="latLngCoord" action="assets/php/addMarkersToDatabase.php" method="post">
					<div class="form-page">
						<div class="form-element lng">
							<p>lng:</p>
							<input type="text" name="lng" readonly>
						</div>
						<div class="form-element lat">
							<p>lat:</p>
							<input  type="text" name="lat" readonly>
						</div>
						<div class="next-button middle">Next</div>
					</div>
					<div class="form-page">
						<div class="form-element location">
							<p>location:</p>
							<input type="text" name="location">
						</div>
						<div class="form-element camera">
							<p>camera:</p>
							<select id="camera-select" name="cameras">
								<option>Select a Camera</option>
								<option>GoPro Hero</option>
								<option>Sony HDR</option>
								<option>JVC</option>
								<option>Contour</option>
								<option>Drift Innovations</option>
							</select>
						</div>
						<div class="previous-button">Previous</div>
						<div class="next-button">Next</div>
					</div>
					<div class="form-page">
						<div class="form-element">
							<p>video URL:<input class="video" type="url" name="video"></p>
						</div>
						<div class="form-element submit">
							<p><input type="submit" name="submit" disabled></p>
						</div>
						<div class="previous-button middle">Previous</div>
					</div>
					
					<!-- <div class="form-element">
						<input class="checkbox" type = "checkbox" name="appropriate" value="Yes"/>
					</div> -->
				</form>

				<div class="exit-form">x</div>
			</div>
			<div id='map'></div>
			<div id='geocoder-container'></div>
			<div class="pic-container"></div>
			<div class="add-pin-instruct">Click The Map to Add a Pin!</div>
		</div>
		</svg>
		<script type="text/javascript" src="assets/js/script.js"></script>
	</body>
</html>



