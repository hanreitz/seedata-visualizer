// global variables
const baseUrl = "http://localhost:3000"
const datasetService = new DatasetService(baseUrl)
// initializations of the application

const dataset = [80, 100, 56, 120, 180, 30, 40, 120, 160]

const svgWidth = 500, svgHeight = 300, barPadding = 5
const barWidth = (svgWidth/dataset.length)

const svg = d3.select('svg')
  .attr("width", svgWidth)
  .attr("height", svgHeight)

const yScale = d3.scaleLinear()
  .domain([0, d3.max(dataset)])
  .range([0, svgHeight])

const barChart = svg.selectAll('rect')
  .data(dataset)
  .enter()
  .append("rect")
  .attr("y", function(d) {
    return svgHeight - d
  })
  .attr("height", function(d) {
    return d
  })
  .attr("width", barWidth - barPadding)
  .attr("transform", function(d,i) {
    const translate = [barWidth * i, 0]
    return "translate(" + translate + ")"
  })