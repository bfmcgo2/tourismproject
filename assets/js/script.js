// 50states.svg is located in the assets folder and contains the path of every
// state layed on top of each other so morphSVG can smoothly function

$(document).ready(function(){
	
	// targets via Snap.svg the preexisting #state-stage-svg. 
	// will be used to individualize style on each path
	var s = Snap("#state-stage-svg");
	var statePath = s.select("#CA-stage");
	var p = s.path("M10-5-10,15M15,0,0,15M0-5-20,15").attr({
		fill: "none",
		stroke: "#FD9308",
		strokeWidth: 5
	});

	p = p.pattern(0, 0, 10, 10);
	statePath.attr({
		fill:p
	});
	
	var kentuckyTrans = p.attr({
		stroke:"#005DAA"
	});
	
	var allStates = $(".state").get();
	shuffle(allStates);
	TweenMax.staggerFromTo(allStates ,1, {drawSVG:"0%", delay:0.5},{drawSVG:"100%"}, 0.03);
	
	$(".state").hover(function(){
		// clickedState gets state name (ie, georgia = "GA");
		var clickedState = $(this).attr("id");
		$(this).click(function(){
			if (kentucky.stateId === clickedState) {
				console.log(kentucky.stateId);
			}
		});
		// .state is the class of all state paths in the lower SVG
		console.log($(this).attr("id"));
		
		
		// .state-stage is the class of all state paths in the upper SVG
		TweenMax.to("#CA-stage", 1, {morphSVG:{shape:"#"+clickedState+"-stage", shapeIndex:"auto"}});
		// each state in the above SVG has an id of "statename"-stage, hence 
		// clickedStated+"-stage" links the top svg to the bottom.  
	});

	// --------------------------Mapbox JS-----------------


	mapboxgl.accessToken = 'pk.eyJ1IjoiYmZtY2dvMiIsImEiOiJlS0c1a1drIn0.GNJBFHhd6pqumZDjScZF7Q';
	var map = new mapboxgl.Map({
		container: 'map', // container id
		style: "mapbox://styles/bfmcgo2/cijp84irl001r8zkq9dakuq2g", //stylesheet location
		center: [-97.39,39.01], // starting position
		zoom: 3.5 // starting zoom
	});
	console.log("make map");

	function State(name,stateId,latitude,longitude,swBound,neBound,zoom){
		this.name = name;
		this.stateId=stateId;
		this.latitude = latitude;
		this.longitude = longitude;
		this.swBound = swBound;
		this.neBound = neBound;
		this.zoom = zoom;

		// click takes user to the state on the Mapbox map, shrinks the landing page,
		// removes the stage svg. The country svg serves as a guide to each state

		$(".state#"+stateId).click(function(){
			console.log(this);
			var bounds =[swBound,neBound];

			function fit(){
				map.fitBounds([
					swBound,
					neBound
					]);
			}
			fit();
			$("#landing-page").css({
				"background":"none"
				// "transform":"scale(0.7)"
			});
			$("#map-stage").fadeOut(300);
			TweenMax.to("#landing-page",1,{scale:0.6, bottom:"-5%",left:"-10%",height:"300px",width:"559px"});
		});

	}
														// -80s long(left,right) left=decreasing
														// 30s lat(up,down)     down=decreasing
		//                          name       stateId   lat    long        swBound         neBound         zoom 
	var kentucky    = new State(    "Kentucky",     "KY",   37.57,  -85.69, [-89.55, 36.00],[-81.52,39.300],    2);
	var georgia     = new State(    "Georgia",      "GA",   32.81,  -82.70, [-86.63, 30.20],[-80.75, 35.12],    2);
	var florida     = new State(    "Florida",      "FL",   29.01,  -80.05, [-88.59, 22.00],[-75.74, 31.96],    2);
	var sCarolina   = new State("South Carolina",   "SC",   33.75,  -80.52, [-83.98, 31.71],[-76.99, 35.83],    2);
	var nCarolina   = new State("North Carolina",   "NC",   35.47,  -78.90, [-84.79, 33.58],[-75.35, 37.00],    2);
	var virginia    = new State(    "Virginia",     "VA",   37.72,  -75.19, [-84.00, 36.10],[-75.19, 39.36],    2);
	var maryland    = new State(    "Maryland",     "MD",   39.15,  -76.90, [-80.25, 37.64],[-74.32, 39.98],    2);
	var delaware    = new State(    "Delaware",     "DE",   38.96,  -75.48, [-76.79, 38.30],[-73.94, 39.87],    2);
	var nJersey     = new State(    "New Jersey",   "NJ",   40.24,  -74.37, [-76.27, 38.88],[-73.42, 41.44],    2);
	var nYork       = new State(    "New York",     "NY",   43.02,  -75.92, [-80.50, 40.20],[-70.23, 45.22],    2);
	var pennsylvania= new State(    "Pennsylvania", "PA",   40.95,  -77.75, [-80.97, 39.50],[-74.35, 42.50],    2);
	var connecticut = new State(    "Connecticut",  "CT",   41.59,  -72.64, [-73.81, 41.00],[-71.60, 42.15],    2);
	var rIsland     = new State(    "Rhode Island", "RI",   41.71,  -71.57, [-72.06, 41.21],[-70.89, 42.04],    2);
	var massachusetts=new State(    "Massachusetts","MA",   42.31,  -71.97, [-73.81, 41.28],[-69.71, 42.92],    2);
	var vermont     = new State(    "Vermont",      "VT",   43.90,  -72.81, [-74.99, 42.64],[-70.36, 45.20],    2);
	var nHampshire  = new State(    "New Hampshire","NH",   43.82,  -71.54, [-73.54, 42.55],[-69.75, 45.46],    2);
	var maine       = new State(    "Maine",        "ME",   45.51,  -69.23, [-73.42, 42.82],[-65.29, 47.73],    2);
	var wVirginia   = new State(    "West Virginia","WV",   38.72,  -80.49, [-83.03, 37.09],[-77.63, 40.79],    2);
	var ohio        = new State(    "Ohio",         "OH",   40.23,  -82.76, [-85.84, 38.26],[-80.10, 42.53],    2);
	var tennessee   = new State(    "Tennessee",    "TN",   35.57,  -86.02, [-91.43, 34.41],[-80.89, 37.00],    2);
	var alabama     = new State(    "Alabama",      "AL",   32.72,  -86.84, [-89.47, 29.94],[-84.18, 35.29],    2);
	var mississippi = new State(    "Mississippi",  "MS",   32.79,  -89.99, [-93.63, 29.44],[-86.01, 35.24],    2);
	var louisiana   = new State(    "Louisiana",    "LA",   31.28,  -92.50, [-94.73, 28.49],[-88.34, 33.36],    2);
	var arkansas    = new State(    "Arkansas",     "AR",   34.85,  -92.61, [-95.98, 32.16],[-88.09, 37.65],    2);
	var missouri    = new State(    "Missouri",     "MO",   38.27,  -92.50, [-96.67, 35.99],[-87.80, 40.71],    2);
	var illinois    = new State(    "Illinois",     "IL",   39.97,  -89.25, [-93.28, 37.00],[-85.26, 42.85],    2);
	var indiana     = new State(    "Indiana",      "IN",   39.81,  -86.51, [-89.12, 37.52],[-84.20, 42.27],    2);
	var wisconsin   = new State(    "Wisconsin",    "WI",   44.65,  -89.88, [-92.81, 42.18],[-86.24, 47.53],    2);
	var michigan    = new State(    "Michigan",     "MI",   44.77,  -84.77, [-90.75, 42.12],[-82.00, 48.81],    2);
	var minnesota   = new State(    "Minnesota",    "MN",   46.26,  -94.29, [-98.16, 43.06],[-88.51, 49.49],    2);
	var nDakota     = new State(    "North Dakota", "ND",   47.44,  -100.61,[-105.04,45.52],[-96.29, 49.45],    2);
	var sDakota     = new State(    "South Dakota", "SD",   44.59,  -100.27,[-105.02,42.43],[-95.86, 46.32],    2);
	var iowa        = new State(    "Iowa",         "IA",   42.05,  -93.61, [-96.82, 40.18],[-89.58, 43.95],    2);
	var nebraska    = new State(    "Nebraska",     "NE",   41.40,  -100.07,[-104.72,39.63],[-95.23, 43.30],    2);
	var kansas      = new State(    "Kansas",       "KS",   38.50,  -98.37, [-102.89,36.35],[-94.37, 40.47],    2);
	var oklahoma    = new State(    "Oklahoma",     "OK",   35.70,  -97.48, [-103.20,33.36],[-93.73, 37.45],    2);
	var texas       = new State(    "Texas",        "TX",   31.69,  -98.79, [-107.82,24.98],[-93.27, 37.18],    2);
	var nMexico     = new State(    "New Mexico",   "NM",   34.51,  -106.74,[-110.97,30.50],[-102.12,37.67],    2);
	var colorado    = new State(    "Colorado",     "CO",   39.01,  -105.64,[-110.36,36.22],[-101.50,41.21],    2);
	var wyoming     = new State(    "Wyoming",      "WY",   43.00,  -107.56,[-111.90,40.60],[-103.12,45.44],    2);
	var montana     = new State(    "Montana",      "MT",   47.01,  -109.24,[-116.84,44.03],[-102.51,49.46],    2);
	var idaho       = new State(    "Idaho",        "ID",   44.28,  -114.72,[-119.71,40.62],[-109.00,49.44],    2);
	var utah        = new State(    "Utah",         "UT",   39.24,  -111.57,[-115.26,36.37],[-108.93,42.35],    2);
	var arizona     = new State(    "Arizona",      "AZ",   34.24,  -111.59,[-115.80,30.84],[-107.94,37.89],    2);
	var nevada      = new State(    "Nevada",       "NV",   39.58,  -116.70,[-121.39,34.40],[-112.11,42.26],    2);
	var california  = new State(    "California",   "CA",   36.92,  -119.70,[-126.61,32.34],[-112.00,43.00],    2);
	var oregon      = new State(    "Oregon",       "OR",   43.83,  -120.57,[-125.89,41.52],[-116.03,46.52],    2);
	var washington  = new State(    "Washington",   "WA",   47.51,  -120.58,[-125.16,45.42],[-115.84,49.86],    2);
	var alaska      = new State(    "Alaska",       "AK",   64.64,  -154.56,[-200.31,48.82],[-127.37,73.22],    2);
	var hawaii      = new State(    "Hawaii",       "HI",   20.62,  -157.45,[-161.09,17.97],[-153.90,22.87],    2);


	map.on('style.load', function () {
		
		var features = $.getJSON("/assets/php/getMarkers.php", function(){
			console.log(features.responseJSON[0]);
		});//[]; 
		
		// replace this with an ajax call to fetch markers already saved
		features[0]={
			"type":"Feature",
			"geometry":{
				"type":"Point",
				"coordinates":[
					-77.03238901390978,
					38.913188059745586
				]
			}
		};

	
		var data = {
			"type": "FeatureCollection",
			"features": features
		};

		map.on('dblclick', function(e) {
			console.log(e.lngLat.lng, e.lngLat.lat);
			var newMarker = {
				"type":"Feature",
				"geometry":{
					"type":"Point",
					"coordinates":[
						e.lngLat.lng,
						e.lngLat.lat
					]
				}
			};
			
			features.push(newMarker);
			console.log(features);
			source.setData(data);
			
			// send new coordinate off to the server with ajax
			
		});

		var source = new mapboxgl.GeoJSONSource({data: data});

		map.addSource("markers", source);

		map.addLayer({
			"id":"markers",
			"interactive":true,
			"type":"circle",
			"source":"markers",
			"layout":{},
			"paint":{
				"circle-color":"#454545",
				"circle-radius":15
			}
		});



	
	});


	map.on('click', function (e) {

		// Use featuresAt to get features within a given radius of the click event
		// Use layer option to avoid getting results from other layers
		map.featuresAt(e.point, {layer: 'markers', radius: 10, includeGeometry: true}, function (err, features) {
			if (err) throw err;
			// if there are features within the given radius of the click event,
			// fly to the location of the click event
			if (features.length) {
				// Get coordinates from the symbol and center the map on those coordinates
				map.flyTo({center: features[0].geometry.coordinates});
			}
		});
	});

	


	// Use the same approach as above to indicate that the symbols are clickable
	// by changing the cursor style to 'pointer'.
	map.on('mousemove', function (e) {
		map.featuresAt(e.point, {layer: 'markers', radius: 10}, function (err, features) {
			if (err) throw err;
			map.getCanvas().style.cursor = features.length ? 'pointer' : '';
		});

		// e.point is the x, y coordinates of the mousemove event relative
		// to the top-left corner of the map
		//console.log(JSON.stringify(e.point));
		// e.lngLat is the longitude, latitude geographical position of the event
		//console.log(JSON.stringify(e.lngLat));
	});
});

// shuffling the drawSVG of all the states
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

	// Pick a remaining element...
	randomIndex = Math.floor(Math.random() * currentIndex);
	currentIndex -= 1;

	// And swap it with the current element.
	temporaryValue = array[currentIndex];
	array[currentIndex] = array[randomIndex];
	array[randomIndex] = temporaryValue;
  }

  return array;
}