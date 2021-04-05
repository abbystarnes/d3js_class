/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 2 - Gapminder Clone
*/

const MARGIN = { LEFT: 60, RIGHT: 60, TOP: 60, BOTTOM: 60 };
const WIDTH = 600 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 400 - MARGIN.TOP - MARGIN.BOTTOM;
let counter = 0;
let colors = ["#1192e8", "#ee538b", "#009d9a", "#fa4d56"];
const colorScale = d3.scaleOrdinal(colors);
//   .range(colors)


// start with first year


// x-axis = income
// y-axis = life expectancy

// circle = country
	// radius = population


const svg = d3.select("#chart-area").append("svg")
	.attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
	.attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)

const g = svg.append("g")
	.attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)

d3.json('data/data.json').then((json) => {
	const firstYearArray = json[0].countries;
	const firstYearPopulations = firstYearArray.map(d => d.population);
	const firstYearPopulationMax = d3.max(firstYearPopulations);

	const x = d3.scaleLog()
		.domain([142, 150000])
		.range([0, WIDTH])
	
	const y = d3.scaleLinear()
		.domain([0, 90])
		.range([HEIGHT, 0])
	
	const area = d3.scaleLinear()
		.domain([2_000, 1_400_000_000])
		.range([25*Math.PI, 1500*Math.PI])

	const yAxisCall = d3.axisLeft(y)
		.ticks(5)
		.tickFormat(d => d)

	g.append('g')
		.attr("class", "yAxis")
		.text('X Axis Label')
		.call(yAxisCall)

	const xAxisCall = d3.axisBottom(x)
		.tickValues([400, 4_000, 40_000])
		.tickFormat(d3.format("$"));

	g.append("g")
		.attr("class", "xAxis")
		.attr("transform", `translate(0, ${HEIGHT})`)
		.text('X Axis Label')
		.call(xAxisCall)

	g.append('text')
		.attr("class", "xLabel")
		.attr('x', (WIDTH/2))
		.attr('y', HEIGHT + 45)
		.attr('text-anchor', 'middle')
		.text("GDP per capita ($)");

	g.append('text')
		.attr("class", "yLabel")
		.attr('x', - (HEIGHT / 2))
		.attr('y', -35)
		.attr('text-anchor', 'middle')
		.attr('transform', 'rotate(-90)')
		.text("Life Expectancy");
	
		g.append('text')
		.attr("class", "yearLabel")
		.attr('x', (WIDTH))
		.attr('y', HEIGHT + 45)
		.attr('text-anchor', 'end')
		.text(json[0].year);

	const update = () => {

		const t = d3.transition()
		.duration(100)
		const yearArray = json[counter].countries;
		const cleanedYearData= yearArray.filter((country) => {
			return (country.income !== null && country.life_exp !== null)
		});

		// JOIN
		const circles = g.selectAll("circle")
			.data(cleanedYearData, matchKey)

		const year = d3.selectAll('.yearLabel');

		// EXIT
		circles.exit().remove();

		year.exit().remove();

		// UPDATE
		circles
			.attr("cx", d => x(d.income))
			.attr("cy", d => y(d.life_exp))
			.attr("r", d =>  Math.sqrt(area(d.population) / Math.PI))

		year
			.attr("class", "yearLabel")
			.attr('x', (WIDTH))
			.attr('y', HEIGHT + 45)
			.attr('text-anchor', 'end')
			.text(json[counter].year)

		// ENTER
		circles.enter()
			.append("circle")
			.attr("class", "dot")
			.attr("cx", d => x(d.income))
			.attr("cy", d => y(d.life_exp))
			.attr("r", d =>  Math.sqrt(area(d.population) / Math.PI))
			.style("fill", d =>  colorScale(d.continent))
		
		year.enter()
			.attr("class", "yearLabel")
			.attr('x', (WIDTH))
			.attr('y', HEIGHT + 45)
			.attr('text-anchor', 'end')
			.text(json[0].year);


		// if (counter > 10) timer.stop();
		if (counter >= json.length - 1) {
			counter = 0;
		};

		counter++;
	}
	
	const timer = d3.interval(update, 100);
});

const matchKey = item => (item.country === item.country);
