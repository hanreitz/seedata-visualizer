class Visualization {
  // make sure delete option removes from Visualization.all
  static all = []

  static visualizationContainer = document.getElementById('visualization-container')
  static visualizationForm = document.getElementById('visualization-form-container')

  constructor({id, name, svgSpecs, datasetId}){
    this.id = id
    this.name = name
    this.svgSpecs = svgSpecs
    this.datasetId = datasetId

    this.element = document.createElement('div')
    this.element.id = `visualization-${this.id}`

    Visualization.all.push(this)
  }

  visualizationElement(){
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
        Choose a dataset: <select id="select-dataset"><br><br>
        <input type="submit">
      </form>
    `
    const selectDataset = document.getElementById('select-dataset')
    for (i in Dataset.all) {
      selectDataset.options[selectDataset.options.length] = new Option(Dataset.all[i], i)
    }
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