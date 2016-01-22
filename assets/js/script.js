// 50states.svg is located in the assets folder and contains the path of every
// state layed on top of each other so morphSVG can smoothly function

$(document).ready(function(){
	console.log("hello world");
	
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
	})
	
	var kentuckyTrans = p.attr({
		stroke:"#005DAA"
	});
	
	var allStates = $(".state").get();
	shuffle(allStates);
	TweenMax.staggerFromTo(allStates ,1, {drawSVG:"0%", delay:.5}, {drawSVG:"100%"}, 0.03);
	

	
	
	

// --------------------------Mapbox JS-----------------

	function State(name,stateId,latitude,longitude,swBound,neBound,zoom){
		this.name = name;
		this.stateId=stateId
		this.latitude = latitude;
		this.longitude = longitude;
		this.swBound = swBound;
		this.neBound = neBound;
		this.zoom = zoom;
	}



	var kentucky = new State("Kentucky","KY", 37.57, -85.69, [-89.55,36.00],[-81.52,39.30],1);
	var georgia = new State("Georgia","GA",32.81, -82.70, [-86.63, 30.20], [-80.75, 35.12],2)

	mapboxgl.accessToken = 'pk.eyJ1IjoiYmZtY2dvMiIsImEiOiJlS0c1a1drIn0.GNJBFHhd6pqumZDjScZF7Q';
	

	var bounds =[georgia.swBound,georgia.neBound];

	var map = new mapboxgl.Map({
	    container: 'map', // container id
	    style: "mapbox://styles/bfmcgo2/cijp84irl001r8zkq9dakuq2g", //stylesheet location
	    center: [georgia.longitude, georgia.latitude], // starting position
	    zoom: georgia.zoom, // starting zoom
	    maxBounds: bounds
	});
	console.log(georgia);
	
	$(".state").hover(function(){
		// clickedState gets state name (ie, georgia = "GA");
		var clickedState = $(this).attr("id");
		$(this).click(function(){
			if (kentucky.stateId === clickedState) {
				console.log(kentucky.stateId);
			};
		})
		// .state is the class of all state paths in the lower SVG
		console.log($(this).attr("id"));
		
		
		// .state-stage is the class of all state paths in the upper SVG
		TweenMax.to("#CA-stage", 1, {morphSVG:{shape:"#"+clickedState+"-stage", shapeIndex:"auto"}});
		// each state in the above SVG has an id of "statename"-stage, hence 
		// clickedStated+"-stage" links the top svg to the bottom.	
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