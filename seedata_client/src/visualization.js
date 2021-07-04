class Visualization {
  // make sure delete option removes from Visualization.all
  static all = []

  static visualizationContainer = document.getElementById('visualization-container')
  static visualizationForm = document.getElementById('visualization-form-container')
  static visualizationSpecForm = document.getElementById('visualization-specs-container')

  constructor({id, name, type, svg_specs, dataset}){
    this.id = id
    this.name = name
    this.type = type
    this.svg_specs = svg_specs
    this.dataset_id = dataset.id

    this.element = document.createElement('div')
    this.element.id = `visualization-${this.id}`

    Visualization.all.push(this)
  }

  visualizationElement(){
    this.element.dataset.id
    this.element.innerHTML += `
      d3 stuff here
    `
    return this.element
  }

  addToDom(){
    Visualization.visualizationContainer.appendChild(this.visualizationElement())
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
    const dataset = Dataset.all.find(e => e.id === datasetId)
    Visualization.visualizationSpecForm.innerHTML += `
      <h3>Select Your Data</h3>
      <form id="new-data-selection-form">
        Select x (or labels): <select id="x-data">
          <option selected disabled hidden style='display: none' value=''></option>
        </select><br><br>
        Select y (or data): <select id="y-data">
          <option selected disabled hidden style='display: none' value=''></option>
        </select><br><br>
        <input type="hidden" id="pass_dataset_id" value=${datasetId}>
        <input type="hidden" id="pass_type" value=${type}>
        <input type="submit">
      </form>
    `
    Visualization.renderSpecOptions(dataset,type)
  }

  static renderSpecOptions(dataset, type) {
    const xData = document.getElementById('x-data')
    const yData = document.getElementById('y-data')
    const columns = dataset.contents.replaceAll('\"', '').match(/\[\[(.*?)\]/g)[0].split('[[')[1].replace(']','').replaceAll(' ','').split(',')

    // Visualization.visualizationSpecForm.innerHTML += `
    //   <input type="hidden" name="dataset_id_pass" value=${dataset.id}>
    //   <input type="hidden" name="type_pass" value=${type}>
    // `

    if (type === 'bar-chart'){
      for (const i in columns) {
        xData.options.add(new Option(columns[i], i))
        yData.options.add(new Option(columns[i], i))
      }
    } // } else if (type === 'line-graph'){

    // } else if (type === 'pie-chart'){

    // } else if (type === 'data-table'){
   
    // }
    //Visualization.visualizationForm.innerHTML += `
    
   // `
  }

  static renderVisualization(){
    const dataset = document.getElementById('pass_dataset_id').value
    const type = document.getElementById('pass_type').value
    const xChoice = document.getElementById('x-data').value
    const yChoice = document.getElementById('y-data').value
    debugger;
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