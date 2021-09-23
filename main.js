// chart styling
const svgWidth = 800;
const svgHeight = 600;

const svg = d3
  .select('.canvas')
  .append('svg')
  .attr('width', svgWidth)
  .attr('height', svgHeight)
  .style('border', '2px solid gray'); // Chart border

const margin = { top: 20, right: 20, bottom: 100, left: 100 };
const chartWidth = svgWidth - margin.left - margin.right;
const chartHeight = svgHeight - margin.top - margin.bottom;

// Initialize the chart
const chart = svg
  .append('g')
  .attr('width', chartWidth)
  .attr('height', chartHeight)
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

// Initialize each axis
const xAxisGroup = chart.append('g').attr('transform', `translate(0, ${chartHeight})`);
const yAxisGroup = chart.append('g');

// Scaling band for the x-axis(timestamps)
const xScale = d3.scaleBand().range([0, chartWidth]).paddingInner(0.2).paddingOuter(0.2);

// Linear scaling for the y-axis(temperature)
const yScale = d3.scaleLinear().range([chartHeight, 0]);

// Scale the x-axis (timestamps)
const xAxis = d3.axisBottom(xScale);

// Adds a temperature label for every 10 degrees
const yAxis = d3
  .axisLeft(yScale)
  .ticks(10)
  .tickFormat((d) => `${d}`);

// Update the chart when new data is added
const update = (data) => {
  // Handle the scaling domains
  xScale.domain(data.map((item) => item.date));
  yScale.domain([0, d3.max(data, (d) => d.value)]);

  // const rects = chart.selectAll('rect').data(data);

  const line = d3.line()
                .x(function (d) { return xScale(d.date); })
                .y(function (d) { return yScale(+d.value); });

  // //Remove extra nodes from the DOM
  // rects.exit().remove();

  // // Initial chart scaling and styling for entries
  // rects
  //   .attr('width', xScale.bandwidth)
  //   .attr('height', (d) => chartHeight - yScale(d.value))
  //   .attr('x', (d) => xScale(d.date))
  //   .attr('y', (d) => yScale(d.value))
  //   .style('fill', 'orange');

  // // chart scaling and styling for new entries
  // rects
  //   .enter()
  //   .append('rect')
  //   .attr('x', (d) => xScale(d.date))
  //   .attr('y', (d) => yScale(d.value))
  //   .attr('width', xScale.bandwidth)
  //   .transition()
  //   .duration(1000)
  //   .attr('height', (d) => chartHeight - yScale(d.value))
  //   .style('fill', 'orange') // Bar color
  
  chart.append("path")
    .attr("fill", "none")
    .attr("stroke", "orange")
    .attr("stroke-miterlimit", 1)
    .attr("stroke-width", 3)
    .attr("d", line(data));

  xAxisGroup.call(xAxis);
  yAxisGroup.call(yAxis);

  // Handle the chart label styling
  xAxisGroup
    .selectAll('text')
    .attr('text-anchor', 'end')
    .attr('transform', 'rotate(-40)') // tilt the timestamps by 40 degrees
    .attr('fill', 'orange') // Timestamp(x-axis) color
    .attr('font-size', '0.5rem'); //  Timestamp(x-axis) font size

  yAxisGroup
    .selectAll('text')
    .attr('text-anchor', 'end')
    .attr('fill', 'orange') //  Temperature(y-axis) color
    .attr('font-size', '0.75rem'); // Temperature(y-axis) font size
};

d3.json('data.json').then(function (data) { update(data)})
