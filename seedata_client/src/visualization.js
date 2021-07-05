class Visualization {
  // make sure delete option removes from Visualization.all
  static all = []

  static visualizationContainer = document.getElementById('visualization-container')
  static visualizationForm = document.getElementById('visualization-form-container')
  static visualizationSpecForm = document.getElementById('visualization-specs-container')

  constructor({id, name, chart_type, x_choice, y_choice, dataset_id}){
    this.id = id
    this.name = name
    this.chart_type = chart_type
    this.x_choice = x_choice
    this.y_choice = y_choice
    this.dataset_id = dataset_id

    this.element = document.createElement('svg')
    this.element.id = `${this.chart_type}-${this.id}`

    Visualization.all.push(this)
  }

  static renderForm(){
    Visualization.visualizationForm.innerHTML += `
      <h3>Create a New Visualization</h3>
      <form id="new-visualization-form">
        Visualization name: <input type="text" id="visualization-name"><br><br>
        Choose a dataset: <select id="select-dataset">
          <option selected disabled hidden style='display: none' value=''></option>
        </select><br><br>
        Select a visualization type: <select id="visualization-types">
          <option selected disabled hidden style='display: none' value=''></option>
          <option value="bar-chart">Bar Graph</option>
          <option value="line-graph">Line Graph</option>
          <option value="pie-chart">Pie Chart</option>
          <option value="data-table">Data Table</option>
        </select><br><br>
        <input type="submit">
      </form>
    `
  }

  static renderSpecForm(){
    const datasetId = parseInt(document.getElementById('select-dataset').value)
    const type = document.getElementById('visualization-types').value
    const name = document.getElementById('visualization-name').value
    const dataset = Visualization.getDataSetFromId(datasetId)
    Visualization.visualizationSpecForm.innerHTML += `
      <h3>Select Your Data</h3>
      <form id="new-data-selection-form">
        Select x (or labels): <select id="x-data">
          <option selected disabled hidden style='display: none' value=''></option>
        </select><br><br>
        Select y (or data): <select id="y-data">
          <option selected disabled hidden style='display: none' value=''></option>
        </select><br><br>
        <input type="hidden" id="pass_name" value=${name}>
        <input type="hidden" id="pass_dataset_id" value=${datasetId}>
        <input type="hidden" id="pass_type" value=${type}>
        <input type="submit">
      </form>
    `
    Visualization.renderSpecOptions(dataset)
  }

  static renderSpecOptions(dataset) {
    const xData = document.getElementById('x-data')
    const yData = document.getElementById('y-data')
    const dataArray = Visualization.makeArrayFromDataset(dataset)
    const headers = Visualization.formatRow(dataArray, 0)

    for (const i in headers) {
      xData.options.add(new Option(headers[i], i))
      yData.options.add(new Option(headers[i], i))
    }
  }

  renderVisualization(){
    const name = document.getElementById('pass_name')
    const type = document.getElementById('pass_type').value
    const xChoice = document.getElementById('x-data').value
    const yChoice = document.getElementById('y-data').value
    const datasetId = parseInt(document.getElementById('pass_dataset_id').value)

    const xData = this.getData(datasetId, xChoice)
    const xLabel = xData[0]
    const xValues = xData.slice(1)

    const yData = this.getData(datasetId, yChoice)
    const yLabel = yData[0]
    const yValues = yData.slice(1)

    if (type === 'bar-chart'){
      this.element.innerHTML += `${this.renderBarChart(xValues, yValues, xLabel, yLabel)}`
      Visualization.visualizationContainer.appendChild(this.element)
    }
  }

  renderBarChart(xValues, yValues, xLabel, yLabel){
    const yNumbers = []
    for(const e of yValues){
      yNumbers.push(parseFloat(e))
    }
    const svgWidth = 700, svgHeight = 500, barPadding = 5
    const barWidth = (svgWidth/yNumbers.length)

    const svg = d3.select('#visualization-container')
      .append('svg')
      .attr("width", svgWidth)
      .attr("height", svgHeight)
      .attr("class", "bar-chart")

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(yNumbers)])
      .range([0, svgHeight])

    svg.append("rect").attr("x",150).attr("y",150).attr("fill","black")
    const barChart = svg.selectAll('rect')
      .data(yNumbers)
      .enter()
      .append("rect")
      .classed("bar", true)
      .attr("y", function(data) {
        return svgHeight - yScale(data)
      })
      .attr("height", function(data) {
        return data
      })
      .attr("width", barWidth - barPadding)
      .attr("transform", function(data, i) {
        const translate = [barWidth * i, 0]
        return "translate(" + translate + ")"
      })
  }

  getData(datasetId, choice){
    const dataset = Visualization.getDataSetFromId(datasetId)
    const dataArray = Visualization.makeArrayFromDataset(dataset)
    const headers = Visualization.formatRow(dataArray, 0)
    const data = []
    for (const i in dataArray){
      data.push(Visualization.formatRow(dataArray, i)[choice])
    }
    return data
  }

  static getDataSetFromId(datasetId){
    return Dataset.all.find(e => e.id === datasetId)
  }

  static makeArrayFromDataset(dataset){
    return dataset.contents.replaceAll('\"', '').replace('[[', '[').split('],')
  }

  static formatRow(datasetArray, i){
    return datasetArray[i].replace('[','').replaceAll(' ','').split(',')
  }

}

// const dataset = [80, 100, 56, 120, 180, 30, 40, 120, 160]

// const svgWidth = 500, svgHeight = 300, barPadding = 5
// const barWidth = (svgWidth/dataset.length)

// const svg = d3.select('svg')
//   .attr("width", svgWidth)
//   .attr("height", svgHeight)

// const yScale = d3.scaleLinear()
//   .domain([0, d3.max(dataset)])
//   .range([0, svgHeight])

// const barChart = svg.selectAll('rect')
//   .data(dataset)
//   .enter()
//   .append("rect")
//   .attr("y", function(d) {
//     return svgHeight - d
//   })
//   .attr("height", function(d) {
//     return d
//   })
//   .attr("width", barWidth - barPadding)
//   .attr("transform", function(d,i) {
//     const translate = [barWidth * i, 0]
//     return "translate(" + translate + ")"
//   })