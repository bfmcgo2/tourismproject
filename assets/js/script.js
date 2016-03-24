// 50states.svg is located in the assets folder and contains the path of every
// state layed on top of each other so morphSVG can smoothly function

	

$(document).ready(function(){
	
	
	$(".landing-map-cta").click(function(){
		$(".landing-page-container").fadeOut(300);
		
	})
	// --------------------------Mapbox JS Map-----------------


	mapboxgl.accessToken = 'pk.eyJ1IjoiYmZtY2dvMiIsImEiOiJlS0c1a1drIn0.GNJBFHhd6pqumZDjScZF7Q';
	var mapBounds= [
		[-107.72,40.27],
		[-106.61,40.80]
	];
	var map = new mapboxgl.Map({
		container: 'map', // container id
		style: "mapbox://styles/bfmcgo2/cijp84irl001r8zkq9dakuq2g", //stylesheet location
		center: [-106.84, 40.44], // starting position
		zoom: 12, // starting zoom
		maxBounds:mapBounds
	});


	var geocoder = new mapboxgl.Geocoder();

	geocoder.options.container	= 'geocoder-container';
	geocoder.options.country 	= 'us';
	geocoder.options.proximity	= [-106.84, 40.44];
	geocoder.options.flyTo		= true;

	

	map.addControl(geocoder);
	geocoder.on('loading', function(r) {
       console.log(geocoder._results);
    });
	

		// map.flyTo({
		// 	center: features[0].geometry.coordinates,
		// 	zoom:18
		// });
	

	
	// --------------------------Mapbox JS Map-----------------
	

	map.on('style.load', function (data) {

		// php file grabbing data from Sql
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
				},3000, "easeInOutBack");
			});
		};


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
		};

		var prevFormPage = function(){
			console.log("prev form page");
			$(".form-element").trigger("form_page_change");
			$formPages.filter(":visible").hide().prev().show();
		};



		// Grabbing sql data and putting into array
		

		function handleMarkerData(data){
			// console.log(data);
			coordinates = data;
			
			updateMapMarkers();
		}

		

		// constructing the GeoJSON structure with SQL data
		function updateMapMarkers(){

			coordinates.forEach(function(pin){
				// console.log(pin);
				features = {"type":"Feature"},
				features.geometry= {
					"type":"Point",
					"coordinates": pin.coordinates
				},
				features.properties = {
					"instagramID":pin.instaID,
					"videoURL": pin.videoURL,
					"title":"balloon",
					"marker-symbol": "pin-2",
					"location": pin.location
				};
				featuresArray.push(features);
			});
		
			dataStructure = {
				"type": "FeatureCollection",
				"features": featuresArray
			};
			
			// console.log(featuresArray);
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
						$(".add-content-form").removeClass("pin-added");
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
					$(".add-content-form").removeClass("pin-added");
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
			});

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

		geocoder.on('result', function(r) {
	      console.log(r);
	       map.flyTo({
       			center: r.result.geometry.coordinates,
       			zoom:18
       		});
	    });
		
		map.on("click", function(e){

			console.log("click");
			$(".video-container").fadeOut(300);
			$("iframe").remove();
			$(".pic-container").remove().css({"display":"none"});

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
					map.scrollZoom.disable();
					// clicked an existing pin, show instagram/video/etc
					var instaID= features[0].properties.instagramID;
					var locationID= features[0].properties.location;

					console.log(locationID);
					var instagramLocationAPIURL = "https://api.instagram.com/v1/locations/"+instaID+"/media/recent?access_token=2178978543.76c0077.c6b582cd7f444dd3b439414c5a9c8949&count=20&callback=?";
								//"https://api.instagram.com/v1/locations/"+location+"/media/recent?access_token=2178978543.76c0077.c6b582cd7f444dd3b439414c5a9c8949&callback=?"
					
					$.getJSON(instagramLocationAPIURL).done(function( response ){
						$(".instagram-cta").click(function(){
							$(".pic-container").remove().css({"display":"none"});
							$("#map-container").append("<div class=pic-container></div>");
							$(".pic-container").fadeIn(200);
							console.log(response);
							for (var i = 0; i < 9; i++) {
								console.log(response);
								$(".pic-container").append("<a target='_blank' href='" + response.data[i].link +
								"'><img src='" + response.data[i].images.thumbnail.url +"'></img></a>").fadeIn(200);
								$(".pic-container a").css({
									"display":"none",
								}).delay(200).fadeIn(400);
							}
						});
					});
					
					
					var videoURL = features[0].properties.videoURL;
					var vimeoID = videoURL.match(/vimeo.com\/(.+)/);
					var youtubeID= videoURL.match(/v=(.+)/);
					
					// Appending Video Container
					var videoContainer = document.createElement("div");
					videoContainer.setAttribute("class","video-container");
					document.querySelector("#map-container").appendChild(videoContainer);
					
					// Appending Video Details Container
					var videoPreviewContainer = document.createElement("div");
					videoPreviewContainer.setAttribute("class","video-preview-container");
					videoContainer.appendChild(videoPreviewContainer);
					
					// Appending Camera Button
					var cameraTypeButton = document.createElement("div");
					cameraTypeButton.setAttribute("class","camera-type-cta");
					videoPreviewContainer.appendChild(cameraTypeButton);
					var cameraTypeCopy = document.createElement("h3");
					cameraTypeButton.appendChild(cameraTypeCopy);
					$('.camera-type-cta > h3').html("CAMERA TYPE");
					
					// Appending Instagram Button
					var instagramCTA = document.createElement("div");
					instagramCTA.setAttribute("class","instagram-cta");
					videoPreviewContainer.appendChild(instagramCTA);
					var instagramCopy = document.createElement("h3");
					instagramCTA.appendChild(instagramCopy);
					$('.instagram-cta > h3').html("INSTAGRAM FEED");
					
					// Appending Location Tag
					var locationIdentifier =document.createElement("div");
					locationIdentifier.setAttribute("class","location-identifier");
					videoPreviewContainer.appendChild(locationIdentifier);
					var locationIdCopy = document.createElement("h3");
					locationIdentifier.appendChild(locationIdCopy);
					$('.location-identifier > h3').html(locationID.toUpperCase());


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
					videoPreviewContainer.appendChild(createVideo);

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
								"marker-symbol":"pin-2"
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
								"marker-symbol":"pin-2"
							}
						};
						featuresArray.push(newMarker);
						source.setData(dataStructure);
					}
				}else{
					map.scrollZoom.enable();
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