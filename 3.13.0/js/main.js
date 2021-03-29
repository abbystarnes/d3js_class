/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 1 - Star Break Coffee
*/

const MARGIN = { LEFT: 50, RIGHT: 50, TOP: 50, BOTTOM: 50 };
const WIDTH = 600 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 400 - MARGIN.TOP - MARGIN.BOTTOM;
const colorScale = d3.schemeSet1;

const svg = d3.select("#chart-area").append("svg")
.attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
.attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)

const g = svg.append("g")
  .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)




d3.csv("data/revenues.csv").then(data => {
  data.forEach(d => {
    d.revenue = Number(d.revenue)
  })
  const months = data.map(d => d.month);
  const revenues = data.map(d => d.revenue);

  const x = d3.scaleBand()
    .domain(months)
    .range([0, WIDTH])
    .paddingInner(0.3)
    .paddingOuter(0.2)
  
  const y = d3.scaleLinear()
    .domain( [ 0, d3.max(revenues)])
    .range([HEIGHT, 0])

  const rects = g.selectAll("rect").data(data)

  rects.enter().append("rect")
    .attr('x', (d, i) => x(d.month))
    .attr('y', (d, i) => y(d.revenue))
    .attr('width',  x.bandwidth)
    .attr('height', (d, i) => HEIGHT - y(d.revenue))
    .attr("fill",  (d, i) => d3.interpolateYlGn(1- y(d.revenue)/HEIGHT));
    
  const yAxisCall = d3.axisLeft(y)
    .ticks(5)
    .tickFormat(d => d + "m")
    g.append('g')
      .attr("class", "y axis")
      .call(yAxisCall)

  const xAxisCall = d3.axisBottom(x)
    g.append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(0, ${HEIGHT})`)
    .call(xAxisCall)
    .selectAll("text")
      .attr("y", 10)
      .attr("x", -5)
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-40)")
})

//.attr("transform", `translate(0, ${HEIGHT})`)