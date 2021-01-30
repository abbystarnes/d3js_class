/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 1 - Star Break Coffee
*/

d3.csv("data/revenues.csv").then(data => {
  data.forEach(d => {
    d.revenue = Number(d.revenue)
    d.profit = Number(d.profit)
  })
  console.log(data, 'data');

  const MARGIN = { LEFT: 50, RIGHT: 50, TOP: 50, BOTTOM: 50 };
  const WIDTH = 600 - MARGIN.LEFT - MARGIN.RIGHT;
  const HEIGHT = 400 - MARGIN.TOP - MARGIN.BOTTOM;
  const months = data.map(d => d.month);
  const revenues = data.map(d => d.revenue);
  const colorScale = d3.schemeSet1;

  const x = d3.scaleBand()
    .domain(months)
    .range([0, WIDTH])
    
  const y = d3.scaleLinear()
  .domain( [0, d3.max(revenues)])
  .range([0, HEIGHT])

  const g = d3.select("#chart-area").append("svg")
    .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
    .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
  .append("g")
    .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)

  
  const rects = g.selectAll("rect").data(data)

  rects.enter().append("rect")
    .attr('x', (d, i) => (i * 55) + 50)
    .attr('y', (d, i) => HEIGHT - y(d.revenue))
    .attr('width',  35)
    .attr('height', (d, i) => y(d.revenue))
    .attr("fill",  (d, i) => d3.interpolateYlGn(y(d.revenue)/HEIGHT));
    
  const leftAxis = d3.axisLeft(y)
    .ticks(5)
    .tickFormat(d => d + "m")
    g.append('g')
      .attr("class", "left axis")
      .call(leftAxis)

  const bottomAxis = d3.axisBottom(x)
    .tickValues(data.map(d => d.month))
    g.append('g')
    .call(bottomAxis)
})

//.attr("transform", `translate(0, ${HEIGHT})`)