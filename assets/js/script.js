// 50states.svg is located in the assets folder and contains the path of every
// state layed on top of each other so morphSVG can smoothly function

	

$(document).ready(function(){
	
	
	$(".enter-cta").click(function(){
		$("#atlanta-landing-page").fadeOut(300);

	})
	// --------------------------Mapbox JS Map-----------------


	mapboxgl.accessToken = 'pk.eyJ1IjoiYmZtY2dvMiIsImEiOiJlS0c1a1drIn0.GNJBFHhd6pqumZDjScZF7Q';
	var mapBounds= [
		[-84.55,33.70],
		[-84.25,33.87]
	];
	var map = new mapboxgl.Map({
		container: 'map', // container id
		style: "mapbox://styles/bfmcgo2/cijp84irl001r8zkq9dakuq2g", //stylesheet location
		center: [-84.39,33.76], // starting position
		zoom: 13, // starting zoom
		maxBounds:mapBounds
	});

	var geocoder = new mapboxgl.Geocoder({
	  container: 'geocoder-container',
	  proximity:  [-84.25,33.87]
	});
	map.addControl(geocoder);


	// --------------------------Mapbox JS Map-----------------
	

	map.on('style.load', function (data) {
		// php file grabbing data from Sql
		// console.log("hello");
		$.getJSON("/assets/php/getMarkerData.php").done(handleMarkerData);
		
		map.doubleClickZoom.disable();
		// CONSTRUCTING THE GEOJSON FOR PINS
		var coordinates = [];
		var source;
		var featuresArray=[];
		var dataStructure;
		var newMarker; // temporary pin
		var $formPages = $("div.form-page");
		


		var showForm = function() {

			$(".add-content-form input[type='text']").val("");

			console.log("show the form");
			$formPages.hide().first().show();
			$(".add-content-form").show();
			$(".add-content-form").animate({
				"width":"306px"
			},300, function(){
				$("#latLngCoord").fadeIn(300);
				$(".add-content-form").removeClass("pin-added");
				// map.on("click", mapClickHandler);
			});

			$(".add-pin-instruct").show().css({"bottom":"-115px"}).animate({
				"bottom":"-35px"
			}, 3000, "easeOutElastic", function(){
				$(this).animate({
					"bottom":"-115px"
				},3000, "easeInOutBack")
			})
		}


		var hideForm = function() {
			$("#latLngCoord").fadeOut(300,function(){
				$(".add-content-form").animate({
					"width":"0px"
				},
				300, "easeInOutBack");
				$(".add-content-form").addClass("pin-added");
			});
			$(".add-pin-instruct").hide();
		};


		var nextFormPage = function() {
			console.log("form next page");
			$(".form-element").trigger("form_page_change");
			$formPages.filter(":visible").hide().next().show();
		}

		var prevFormPage = function(){
			console.log("prev form page");
			$(".form-element").trigger("form_page_change");
			$formPages.filter(":visible").hide().prev().show();
		}



		// Grabbing sql data and putting into array
		

		function handleMarkerData(data){
			console.log(data);
			coordinates = data;
			
			updateMapMarkers();
		}

		

		// constructing the GeoJSON structure with SQL data
		function updateMapMarkers(){

			coordinates.forEach(function(pin){
				console.log(pin);
				features = {"type":"Feature"},
				features.geometry= {
					"type":"Point",
					"coordinates": pin.coordinates
				},
				features.properties = {
					"instagramID":pin.instaID,
					"videoURL": pin.videoURL,
					"title":"balloon",
					"marker-symbol": "circusball"
				};
				featuresArray.push(features);
			});
		
			dataStructure = {
				"type": "FeatureCollection",
				"features": featuresArray
			};
			
			console.log(featuresArray);
			source = new mapboxgl.GeoJSONSource({data: dataStructure});

			map.addSource("markers", source);

			map.addLayer({
				"id":"markers",
				"interactive":true,
				"type":"symbol",
				"source":"markers",
				"layout":{
					"icon-image": "{marker-symbol}",
				},
				"paint":{
					
				}

			});
			userAddPinsToMap();
			console.log(coordinates);
		}

		// END GEOJSON CONSTRUCTION



		function userAddPinsToMap() {
			
			$(".add-pin-cta").click(function(){
				

				$(".add-content-form").toggleClass("active-class");

				if($(".add-content-form").hasClass("active-class")){
					$(".exit-form").show();
					showForm();
					

				} else{
					$(".exit-form").hide();
					hideForm();
					if ($(".add-content-form").hasClass("pin-added")) {
						// remove newMarker from map
						featuresArray.pop();
						source.setData(dataStructure);	
						$(".add-content-form").removeClass("pin-added")
					}
				}
				
				$(".form-element").on("keyup form_page_change", function(){
					if ( !$(".add-content-form input[name='lng']").val() ||
						!$(".add-content-form input[name='lat']").val() ||
						!$(".add-content-form input[name='location']").val() ||
						!$("#camera-select").val() ||
						!$(".add-content-form input[name='video']").val() ){
						$(".add-content-form input[type='submit']").prop('disabled', true);
					} else {
						$(".add-content-form input[type='submit']").prop('disabled', false);
						$(".add-content-form input[type='submit']").css({
							"background-color":"green",
							"color":"white"
						});
					}
				});
			});

			$(".exit-form").click(function(){
				$(this).hide();
				$(".add-content-form").removeClass("active-class");
				hideForm();
				if ($(".add-content-form").hasClass("pin-added")) {
					// remove newMarker from map
					featuresArray.pop();
					source.setData(dataStructure);	
					$(".add-content-form").removeClass("pin-added")
				}

			});

			$("#latLngCoord").submit(function(event){
				event.preventDefault();

				var $form = $(this);
				formUrl = $form.attr("action");
				var post = $form.serialize();
				console.log(post);



				$.post(formUrl, post, function() { 
					
					hideForm();
					$(".add-content-form input[name='lat']").val("");
					$(".add-content-form input[name='lng']").val("");
					$(".add-content-form input[name='location']").val("");
					$(".add-content-form input[name='video']").val("");
					$(".add-content-form").removeClass("pin-added");
					$(".add-content-form").removeClass("active-class");
				});
			})

		}


		

		$(".next-button").click(nextFormPage);
		$(".previous-button").click(prevFormPage);
		$(".add-pin-cta").hover(function(){
			$(this).animate({
				"width":"200px",
				"font-size":"20px"
			});
		},function(){
			$(this).animate({
				"width":"100px",
				"font-size":"16px"
			});
		})


		map.on("click", function(e){

			if ($(".add-content-form").hasClass("active-class")) {
				console.log("put lat/long in input field")
				$(".lng input").val(e.lngLat.lng);
				$(".lat input").val(e.lngLat.lat);
				map.flyTo({center: [e.lngLat.lng, e.lngLat.lat]});
			}

			$(".pic-container").hide();
			$(".video-container").remove();
			$("iframe").remove();
			var $activeElements = $($formPages[0]).add($formPages[1]);
			$($activeElements).animate({"opacity":"1"});

			map.featuresAt(e.point, {layer: 'markers', radius: 40, includeGeometry: true}, function (err, features) {
				if (err) throw err;

				if (features.length) {

					

					$("#map-container").append("<div class=pic-container></div>");
					$(".pic-container").fadeIn(200);
					// clicked an existing pin, show instagram/video/etc
					var instaID= features[0].properties.instagramID;
					console.log(features[0]);
					var instagramLocationAPIURL = "https://api.instagram.com/v1/locations/"+instaID+"/media/recent?access_token=2178978543.76c0077.c6b582cd7f444dd3b439414c5a9c8949&count=20&callback=?";
								//"https://api.instagram.com/v1/locations/"+location+"/media/recent?access_token=2178978543.76c0077.c6b582cd7f444dd3b439414c5a9c8949&callback=?"
					$.getJSON(instagramLocationAPIURL).done(function( response ){

						console.log(response);
						for (var i = 0; i < 20; i++) {
							console.log(response);
							$(".pic-container").append("<a target='_blank' href='" + response.data[i].link +
							"'><img src='" + response.data[i].images.thumbnail.url +"'></img></a>").fadeIn(200);
							$(".pic-container a").css({
								"display":"none",
							}).delay(200).fadeIn(400);
							

						}
					});
					
					var videoURL = features[0].properties.videoURL;
					var vimeoID = videoURL.match(/vimeo.com\/(.+)/);
					var youtubeID= videoURL.match(/v=(.+)/);

					var videoContainer = document.createElement("div");
					videoContainer.setAttribute("class","video-container");
					document.querySelector("#map-container").appendChild(videoContainer);

					$(".video-container").click(function(){
						console.log("click");
						$(this).fadeOut(300);
						$("iframe").remove();
						$(".pic-container").remove().css({"display":"none"});
					});

					var createVideo = document.createElement("iframe");
					createVideo.setAttribute("class", "video-preview");
					if (vimeoID) {
						// console.log(vimeoID[1]);
						createVideo.setAttribute("src","https://player.vimeo.com/video/"+vimeoID[1]+"?autoplay=0&loop=1&title=0&byline=0&portrait=0");
					}else if(youtubeID){
						console.log(youtubeID[1]);
						createVideo.setAttribute("src","http://www.youtube.com/embed/"+youtubeID[1]+"?autoplay=0");
					}
					console.log(videoContainer);
					console.log(createVideo);
					videoContainer.appendChild(createVideo);

					// Get coordinates from the symbol and center the map on those coordinates
					map.flyTo({
						center: features[0].geometry.coordinates,
						zoom:18
					});

					console.log(features[0].properties.videoURL);
					
					


				} else if($(".add-content-form").hasClass("active-class")){
					// user clicked part of map with no pins, add a pin


					if ($(".add-content-form").hasClass("pin-added")) {
						// dont let them add another pin
						featuresArray.pop();
						newMarker = {
							"type":"Feature",
							"geometry":{
								"type":"Point",
								"coordinates":[
									e.lngLat.lng,
									e.lngLat.lat
								]
							},
							"properties":{
								"marker-symbol":"circusball"
							}
						};
						featuresArray.push(newMarker);
						source.setData(dataStructure);

					}else {
						$(".add-content-form").addClass("pin-added");
						console.log("add regular pin");
						newMarker = {
							"type":"Feature",
							"geometry":{
								"type":"Point",
								"coordinates":[
									e.lngLat.lng,
									e.lngLat.lat
								]
							},
							"properties":{
								"marker-symbol":"circusball"
							}
						};
						featuresArray.push(newMarker);
						source.setData(dataStructure);
					}
				}
			});
		});


	});


	//
	// Use the same approach as above to indicate that the symbols are clickable
	// by changing the cursor style to 'pointer'.
	map.on('mousemove', function (e) {
		map.featuresAt(e.point, {layer: 'markers', radius: 10}, function (err, features) {
			if (err) throw err;
			map.getCanvas().style.cursor = features.length ? 'pointer' : '';
		});
	});
	


});



// shuffling the drawSVG of all the states
// function shuffle(array) {
//   var currentIndex = array.length, temporaryValue, randomIndex;

//   // While there remain elements to shuffle...
//   while (0 !== currentIndex) {

// 	// Pick a remaining element...
// 	randomIndex = Math.floor(Math.random() * currentIndex);
// 	currentIndex -= 1;

// 	// And swap it with the current element.
// 	temporaryValue = array[currentIndex];
// 	array[currentIndex] = array[randomIndex];
// 	array[randomIndex] = temporaryValue;
//   }

//   return array;
// }