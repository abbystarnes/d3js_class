/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.8 - Activity: Your first visualization!
*/
d3.json("data/buildings.json").then(data => {
  // code goes here
  data.forEach(d => {
    d.height = Number(d.height)
  })

  const y = d3.scaleLinear()
    .domain( [0, 828])
    .range([0, 400])

  const svg = d3.select("#chart-area").append("svg")
  .attr("width", 500)
  .attr("height", 500)

  const rects = svg.selectAll("rect").data(data);

  rects.enter().append("g")
    .attr('x', (d, i) => (i * 55) + 50)
    .attr('y', 100)
    .attr('width',  35)
    .attr('height', (d) => y(d.height))
    .attr('fill', 'grey')
});

