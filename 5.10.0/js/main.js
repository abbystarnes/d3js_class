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
const colorScale = d3.scaleOrdinal().domain(['europe', 'asia', 'americas', 'africa']).range(colors);
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
		.domain([100, 150000])
		.range([0, WIDTH])
	
	const y = d3.scaleLinear()
		.domain([0, 90])
		.range([HEIGHT, 0])
	
	const r = d3.scaleLinear()
		.domain([0, getRadius(firstYearPopulationMax)])
		.range([5, 25])

	const yAxisCall = d3.axisLeft(y)
		.ticks(5)
		.tickFormat(d => d)

	g.append('g')
		.attr("class", "yAxis")
		.text('X Axis Label')
		.call(yAxisCall)

	const xAxisCall = d3.axisBottom(x)
		.tickValues([400, 4_000, 40_000])
		.tickFormat(d => d);    

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
		.text("GDP per capita");

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
		const yearArray = json[counter].countries;
		const cleanedYearData= yearArray.filter((country) => {
			return (country.income !== null && country.life_exp !== null)
		});

		// JOIN
		const circles = g.selectAll("circle")
			.data(cleanedYearData, matchKey)

		const year = g.select('text').classed('yearLabel', true);
		
		// EXIT
		circles.exit().remove();

		year.exit().remove();

		// UPDATE
		circles
			.attr("cx", d => x(d.income))
			.attr("cy", d => y(d.life_exp))
			.attr("r", d =>  r(getRadius(d.population)))

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
			.attr("r", d =>  r(getRadius(d.population)))
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
	
	const timer = d3.interval(update, 200);
});

const matchKey = item => (item.country === item.country);


const getRadius = population => Math.sqrt(population / 3.14);

// area = pi r squared	
// r = square root (area / pi )

// d3.json("data/data.json").then((data) => {
// 	data = data.map((year, i) => {
// 		// console.log(year, i, 'year, i');
// 		return year.countries = filter(year.countries)
// 	})

// 	const dots =  g.selectAll("dot").data(data)
	
// 	console.log(data[counter].countries, counter)
// 	// Add dots
// 	svg.append('g')
// 		.selectAll("dot")
// 		.data(data[counter].countries)
// 		.append("circle")
// 		.attr("cx", (d) => { return x(d.income); })
// 		.attr("cy", (d) => { return y(d.life_exp); })
// 		.attr("r", (d) => { return (d.population / 10_000_000) })
// 		.style("fill", colorScale(counter))

// 	const update = () => {

// 		counter = counter + 1;
// 		// JOIN new data with old elements.

// 		const circles = d3.select("g").selectAll("dot")
// 			.data(data[counter].countries, joinKey)

// 		console.log(circles, 'circles')
// 		// EXIT old elements not present in new data.
// 		circles.exit().remove()

// 		// UPDATE old elements present in new data.
// 		console.log('update');
// 		circles
// 			.attr("class", "dot")
// 			.attr("cx", (d) => { return x(d.income); })
// 			.attr("cy", (d) => { return y(d.life_exp); })
// 			.attr("r", (d) => { return r(d.population / 10_000_000) })

// 		// ENTER new elements present in new data.
// 		console.log('enter', counter);
// 		circles.enter()
// 			.append("circle")
// 			.attr("class", "dot")
// 			.attr("cx", (d) => { return x(d.income); })
// 			.attr("cy", (d) => { return y(d.life_exp); })
// 			.attr("r", (d) => { return (d.population / 10_000_000) })
// 			.transition(100)
// 			.style("fill", colorScale(counter))

// 		if (counter > 10) timer.stop();
// 		if (counter > data.length - 1) {
// 			counter = 0;
// 		};
// 	}

// 	const timer = d3.interval(update, 3000);

// })

// function joinKey(item) {
// 	return item.population;
// }

// const yAxisCall = d3.axisLeft(y)
// 	.ticks(5)
// 	.tickFormat(d => d)

// g.append('g')
// 	.attr("class", "y axis")
// 	.text('X Axis Label')
// 	.call(yAxisCall)


// const xAxisCall = d3.axisBottom(x)
// 	.tickValues([400, 4000, 40_000])
// 	.tickFormat(d => d);

// g.append("g")
// 	.attr("class", "x axis")
// 	.attr("transform", `translate(0, ${HEIGHT})`)
// 	.text('X Axis Label')
// 	.call(xAxisCall)
