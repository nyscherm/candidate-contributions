$(document).ready(function(){
	// load JSON file
	$.getJSON( "https://nyscherm.github.io/candidate-contributions/data.json", function(data) {
		var contributions = data;
		var contributionTotals = getTotals(contributions);
		addDetails(contributionTotals);
		drawChart(contributionTotals);
		$(".loader").css("display", "none");
		$(".viewSwitch").css("display", "inline-block");
		toggleView("totals");
	}).fail(function() {
    	console.log("Error loading JSON file");
  	});  	  	

  	$(".bar").click(function(){
  		toggleView("totals");
  	});
  	$(".pie").click(function(){
  		toggleView("percent");
  	});
  	$(".text").click(function(){
  		toggleView("text");
  	});
});

// find total contribution amount for each candidate
function getTotals(contributions) {
	var contributionTotals = []; 
	var current = "";
	var index = -1;

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
  	return contributionTotals;
}

// add summarized information to page
function addDetails(contributionTotals) {
	$(".info").prepend("<h2>Totals:</h2>");
  	for (var entry in contributionTotals) {
  		$(".info .details").append("<p>"+contributionTotals[entry].candidate+": $"+contributionTotals[entry].amount.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")+"</p>");
  	}
}

function drawChart(data) { 
	var candidates = [];
	var totals = [];
	var colors = [];

	for (var entry in data) {
  		candidates.push(data[entry].candidate);
  		totals.push(data[entry].amount);
  		colors.push(dynamicColors());
  	}

  	console.log(candidates);
  	console.log(totals);

	var chart = new Chart(document.getElementById("barChart"), {
	    type: 'bar',
	    data: {
	        labels: candidates,
	        datasets: [{
	            label: 'Total contributions',
	            data: totals,
	            backgroundColor: 'rgb(0, 153, 102)',
            	borderColor: 'rgb(0, 153, 102)',
	            borderWidth: 1
	        }]
	    },
	    options: {
	    	legend: { display: false },
			scales: {
				yAxes: [{
                	type: 'logarithmic',
            	}]
            }
	    }
	});

	var chart = new Chart(document.getElementById("pieChart"), {
	    type: 'pie',
	    data: {
	        labels: candidates,
	        datasets: [{
	            label: 'Total contributions',
	            data: totals,
	            backgroundColor: colors
	            //backgroundColor: 'rgb(0, 153, 102)',
            	//borderColor: 'rgb(0, 153, 102)',
	            //borderWidth: 1
	        }]
	    },
	    options: {
	    	legend: { display: false }
	    }
	});
}

// change between chart and text display
function toggleView(button) {
	if (button == "totals") {
		$(".totals").css("display", "block");
		$(".percent").css("display", "none");
		$(".info").css("display", "none");
		$(".viewSwitch .bar").css("background-color", "#d9d9d9");				
		$(".viewSwitch .pie").css("background-color", "#fff");	
		$(".viewSwitch .text").css("background-color", "#fff");		
	}
	else if (button == "percent") {
		$(".totals").css("display", "none");
		$(".percent").css("display", "block");
		$(".info").css("display", "none");
		$(".viewSwitch .bar").css("background-color", "#fff");			
		$(".viewSwitch .pie").css("background-color", "#d9d9d9");			
		$(".viewSwitch .text").css("background-color", "#fff");		
	}
	else {
		$(".totals").css("display", "none");
		$(".percent").css("display", "none");
		$(".info").css("display", "block");
		$(".viewSwitch .text").css("background-color", "#d9d9d9");				
		$(".viewSwitch .pie").css("background-color", "#fff");		
		$(".viewSwitch .bar").css("background-color", "#fff");				
	}
}

// because Chart.js just won't do random colors for each data point for you
function dynamicColors() {
	    var r = Math.floor(Math.random() * 255);
	    var g = Math.floor(Math.random() * 255);
	    var b = Math.floor(Math.random() * 255);
	    return "rgb(" + r + "," + g + "," + b + ")";
}
