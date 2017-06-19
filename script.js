$(document).ready(function(){
	var current = "";
	var contributionTotals = []; // array of objects that holds relevant info for each candidate
	var index = -1;

	// load JSON file
	$.getJSON( "data.json", function(data) {
		var contributions = data;
	}).fail(function() {
    	console.log("Error loading JSON file");
  	});

	// find total contribution amount for each candidate
  	$.each(contributions.data, function(key) {
  		current = contributions.data[key].candidate;
  		index = contributionTotals.map(function(e) { return e.candidate; }).indexOf(current);

  		if (index == -1) {
  			contributionTotals.push({
  				candidate: current,
  				amount: parseInt(contributions.data[key].amount)
  			});
  		}
  		else {
  			contributionTotals[index].amount += parseInt(contributions.data[key].amount);
  		}
  	});

  	// add summarized information to page
	$(".info").append("<h2>Totals:</h2>");
  	for (var entry in contributionTotals) {
  		$(".info .details").append("<p>"+contributionTotals[entry].candidate+": $"+contributionTotals[entry].amount+"</p>");
  	}

  	// add chart
  	drawChart(contributionTotals);
  	$(".loader").css("display", "none");
});

function drawChart(data) { 
	var max = d3.max(data.map(function(d) {return d.amount}));
	var scale = 750000;
	var height = max/scale;

	// set graph scale for axis
	var x = d3.scaleOrdinal()
	 	.domain(data.map(function(d) {return d.candidate}))
		.range(data.map(function(d,i){return i * 28}));
	var y = d3.scaleLinear()
	  	.domain([0, max])
	  	.range([height, 0]);

	// add the bars
    var svg = d3.select("svg");
	svg.selectAll("rect")
	    .data(data)
	    .enter()
	    .append("rect")
	    	.attr("class", "bar")
	        .attr("height", function(d) {return d.amount / scale})
	        .attr("width","20")
	        .attr("x", function(d, i) {return i * 28 + 102})
	        .attr("y", function(d) {return height - (d.amount / scale)});

	// add the x axis
	svg.append("g")
		.attr("width", "100%")
		.attr("transform", "translate(110," + height + ")")
		.call(d3.axisBottom(x))
		.selectAll("text")
		    .attr("y", 0)
		    .attr("x", 9)
		    .attr("dy", ".35em")
		    .attr("transform", "rotate(90)")
		    .style("text-anchor", "start");

	// add the y axis
	svg.append("g")
		.attr("transform", "translate(100, 0)")
		.call(d3.axisLeft(y));
}
