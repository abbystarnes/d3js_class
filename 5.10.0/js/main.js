/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 2 - Gapminder Clone
*/

const MARGIN = { LEFT: 50, RIGHT: 50, TOP: 50, BOTTOM: 50 };
const WIDTH = 600 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 400 - MARGIN.TOP - MARGIN.BOTTOM;


const svg = d3.select("#chart-area").append("svg")
	.attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
	.attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)

const g = svg.append("g")
  .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)

const x = d3.scaleLog()
	.domain([100, 150_000])
	.range([0, WIDTH])

const y = d3.scaleLinear()
	.domain([ 0, 90])
	.range([HEIGHT, 0])

d3.json("data/data.json").then(function(data) {
	data = data[0].countries.filter(country => country.income !== null && country.life_exp !== null)

	 // Add dots
	 svg.append('g')
	 .selectAll("dot")
	 .data(data)
	 .enter()
	 .append("circle")
		 .attr("cx", function (d) { return x(d.income); } )
		 .attr("cy", function (d) { return y(d.life_exp); } )
		 .attr("r", function (d) { return (d.population / 10_000_000 )})
		 .style("fill", "#69b3a2")

})

const yAxisCall = d3.axisLeft(y)
	.ticks(5)
	.tickFormat(d => d)

g.append('g')
	.attr("class", "y axis")
	.text('X Axis Label')
	.call(yAxisCall)


const xAxisCall = d3.axisBottom(x)
	.tickValues([400, 4000, 40_000])
	.tickFormat(d => d);

g.append("g")
	.attr("class", "x axis")
	.attr("transform", `translate(0, ${HEIGHT})`)
	.text('X Axis Label')
	.call(xAxisCall)


const update = function() {
	console.log('updating');
}

d3.interval(update, 1000)