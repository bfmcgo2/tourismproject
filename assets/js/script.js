$(document).ready(function(){
	console.log("hello world");
	

	
	
	var allStates = $(".state").get();
	shuffle(allStates);
	TweenMax.staggerFromTo(allStates ,1, {drawSVG:"0%", delay:.5}, {drawSVG:"100%"}, 0.03);
	

	
	var stateSVG;
	$(".state").click(function(){
		console.log($(this).attr("id"));
		var clickedState = $(this).attr("id");

		TweenMax.to(".state-stage", 1, {morphSVG:{shape:"#"+clickedState+"-stage", shapeIndex:"auto"}});
		

					
		
	});
});





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