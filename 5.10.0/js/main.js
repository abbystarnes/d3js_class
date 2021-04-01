/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 2 - Gapminder Clone
*/

const MARGIN = { LEFT: 50, RIGHT: 50, TOP: 50, BOTTOM: 50 };
const WIDTH = 600 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 400 - MARGIN.TOP - MARGIN.BOTTOM;
let counter = 0;

const svg = d3.select("#chart-area").append("svg")
	.attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
	.attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)

const g = svg.append("g")
	.attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)

const x = d3.scaleLog()
	.domain([100, 150_000])
	.range([0, WIDTH])

const y = d3.scaleLinear()
	.domain([0, 90])
	.range([HEIGHT, 0])

const r = d3.scaleLinear()
	.domain([0, 100_000_000])
	.range([5, 25])

d3.json("data/data.json").then((data) => {
	data.map((year, i) => {
		return year.countries = filter(year.countries)
	})


	// Add dots
	svg.append('g')
		.selectAll("dot")
		.data(data[counter].countries)
		.enter()
		.append("circle")
		.attr("cx", (d) => { return x(d.income); })
		.attr("cy", (d) => { return y(d.life_exp); })
		.attr("r", (d) => { return (d.population / 10_000_000) })
		.style("fill", "#69b3a2")

	const update = () => {

		counter += 1;
		// JOIN new data with old elements.

		const arr = data[counter].countries;

		const dots = d3.select("svg").selectAll("dot")
			.data(arr, joinKey)

		console.log(dots, 'dots');
		// EXIT old elements not present in new data.
		dots.exit().remove()

		// UPDATE old elements present in new data.
		dots
			.attr("cx", (d) => { return x(d.income); })
			.attr("cy", (d) => { return y(d.life_exp); })
			.attr("r", (d) => { return r(d.population / 10_000_000) })
			.style("fill", "#24d333")

		// ENTER new elements present in new data.
		dots.enter()
			.append("circle")
			.attr("class", "dot")
			.attr("cx", (d) => { return x(d.income); })
			.attr("cy", (d) => { return y(d.life_exp); })
			.attr("r", (d) => { return (d.population / 10_000_000) })
			.transition(100)
			.style("fill", "#8ffff7")

		if (counter > 3) timer.stop();
		if (counter > data.length - 1) {
			counter = 0;
		};
	}

	const timer = d3.interval(update, 3000);

})

function joinKey(item) {
	return item.country;
}

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

const filter = (values) => {
	return values.filter(country => country.income !== null && country.life_exp !== null)
}