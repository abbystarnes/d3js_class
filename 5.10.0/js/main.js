/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 2 - Gapminder Clone
*/

const MARGIN = { LEFT: 50, RIGHT: 50, TOP: 50, BOTTOM: 50 };
const WIDTH = 600 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 400 - MARGIN.TOP - MARGIN.BOTTOM;
let counter = 0;
let colors = ["gold", "blue", "green", "yellow", "black", "grey", "darkgreen", "pink", "brown", "slateblue", "grey1", "orange"];
const colorScale = d3.scaleLinear().domain([0,100]);
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
	const cleanedFirstYearData= firstYearArray.filter((country) => {
		return (country.income !== null && country.life_exp !== null)
	});
	const firstYearPopulationMax = d3.max(firstYearPopulations);

	const x = d3.scaleLog()
		.domain([100, 150_000])
		.range([0, WIDTH])
	
	const y = d3.scaleLinear()
		.domain([0, 90])
		.range([HEIGHT, 0])
	
	const r = d3.scaleLinear()
		.domain([0, firstYearPopulationMax])
		.range([5, 25])

	svg.append('g')
		.selectAll("dot")
		.data(cleanedFirstYearData)
		.enter()
		.append("circle")
		.attr("cx", d => x(d.income))
		.attr("cy", d => y(d.life_exp))
		.attr("r", d =>  r(d.population))
		.style("fill", "blue")

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
});

// const filterNulls = (country) => {
// 	return values.filter((country) => {
// 		return (country.income !== null && country.life_exp !== null)
// 	})
// }


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

// const filter = (values) => {
// 	return values.filter((country) => {
// 		return (country.income !== null && country.life_exp !== null)
// 	})
// }