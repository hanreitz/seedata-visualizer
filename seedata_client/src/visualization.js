class Visualization {
  // make sure delete option removes from Visualization.all
  static all = []

  static visualizationContainer = document.getElementById('visualization-container')
  static visualizationForm = document.getElementById('visualization-form-container')
  static visualizationSpecForm = document.getElementById('visualization-specs-container')
  static visCardContainer = document.getElementById('visualization-card-container')

  constructor({id, name, chart_type, x_choice, y_choice, dataset_id}){
    this.id = id
    this.name = name
    this.chartType = chart_type
    this.xChoice = x_choice
    this.yChoice = y_choice
    this.datasetId = dataset_id

    this.element = document.createElement('div')
    this.element.id = `vis-card-${this.id}`

    Visualization.all.push(this)
  }

  datasetElement(){
    this.element.innerHTML += `
      <svg id='visualization-${this.id}'></svg>
    `
    return this.element
  }

  addToDom(){
    Visualization.visCardContainer.appendChild(this.datasetElement())
    const renderTarget = document.getElementById(`visualization-${this.id}`)
    this.renderVisualization(this.name, 0.35, renderTarget)  
  }

  static renderForm(){
    Visualization.visualizationForm.innerHTML = ''
    Visualization.visualizationForm.innerHTML += `
      <h3>Create a New Visualization</h3>
      <form id="new-visualization-form">
        Visualization name: <input type="text" id="visualization-name"><br><br>
        Choose a dataset: <select id="select-dataset">
          <option selected disabled hidden style='display: none' value=''></option>
        </select><br><br>
        Select a visualization type: <select id="visualization-types">
          <option selected disabled hidden style='display: none' value=''></option>
          <option value="bar">Bar Graph</option>
          <option value="line">Line Graph</option>
          <option value="pie">Pie Chart</option>
          <option value="table">Data Table</option>
        </select><br><br>
      </form>
    `
    for (const d of Dataset.all){
      d.addOptionToSelect();
    }
  }

  static renderSpecForm(){
    const datasetId = parseInt(document.getElementById('select-dataset').value)
    const type = document.getElementById('visualization-types').value
    const name = document.getElementById('visualization-name').value
    const dataset = Visualization.getDataSetFromId(datasetId)
    Visualization.visualizationForm.innerHTML += `
      <h3>Select Your Data</h3>
      <form id="new-data-selection-form">
        Select x (or labels): <select id="x-data">
          <option selected disabled hidden style='display: none' value=''></option>
        </select><br><br>
        Select y (or data): <select id="y-data">
          <option selected disabled hidden style='display: none' value=''></option>
        </select><br><br>
        <input type="hidden" id="pass_name" value=${name.toLowerCase().replaceAll(' ','-')}>
        <input type="hidden" id="pass_dataset_id" value=${datasetId}>
        <input type="hidden" id="pass_type" value=${type}>
        <input type="submit" id="visualization-spec-submit">
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

// handling visualization clicks
static handleVisualizationClick(){
  let targetDiv = event.target
  while(targetDiv.tagName != 'DIV'){
    targetDiv = targetDiv.parentElement
  }
  const visId = parseInt(targetDiv.id.split('-')[2])
  const visualization = Visualization.all.find(v => v.id === visId)
  const renderTarget = document.getElementById('vis-popup')
  renderTarget.innerHTML = ''
  blurArea.classList.toggle('active')
  Visualization.visualizationContainer.classList.toggle('active')
  visualization.renderVisualization(visualization.name, 1, renderTarget)
}

renderVisualization(name, size, renderTarget){
  const nameArray = name.split('-')
  const fixedNameArray = []
  for(const word of nameArray){
      fixedNameArray.push(word.charAt(0).toUpperCase() + word.slice(1))
  }
  const passName = fixedNameArray.join(' ')

  const xData = Visualization.getData(this.datasetId, this.xChoice)
  const xLabel = xData[0].charAt(0).toUpperCase() + xData[0].slice(1)
  const xValues = xData.slice(1)

  const yData = Visualization.getData(this.datasetId, this.yChoice)
  const yLabel = yData[0]
  const yValues = yData.slice(1)

  if (this.chartType === 'bar'){
    const yNumbers = [];
    for(const e of yValues){
      yNumbers.push(parseFloat(e))
    };

    const xAxisLabels = [];
      for(const e of xValues){
        xAxisLabels.push(e)
      }
      // Visualization.toggleVisBlur()
      this.renderBarChart(xAxisLabels, yNumbers, xLabel, yLabel, passName, size, renderTarget)
    }
  }

  static toggleVisBlur(){
    const blur = document.getElementById('blur')
    blur.classList.toggle('active')
    Visualization.visualizationContainer.classList.toggle('active')
  }

  renderBarChart(xAxisLabels, yNumbers, xLabel, yLabel, name, size, renderTarget){
    // const svgId = document.getElementById(`visualization-${this.id}`)
    const margin = {left: 50*size, right: 20*size, top: 50*size, bottom: 50*size}
    const width = size*(700 - (margin.right + margin.left))
    const height = size*(500 - (margin.top + margin.bottom))
    const barWidth = (width / yNumbers.length)
    const barPadding = 0.25 * barWidth
        
    const svg = d3.select(renderTarget)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.bottom + margin.top);

    const chartTitle = svg.append('text')
      .attr("text-anchor", "middle")
      .attr("transform", "translate(" + (width + margin.left + margin.right)/2 + "," + margin.top/2 + ")")
      .text(name)
      .style('font-size', `${24*size}px`)
        
    const xScale = d3.scaleBand()
      .domain(xAxisLabels)
      .range([0, width])

    const xAxis = d3.axisBottom()
      .scale(xScale)
      .tickSize(6*size)
    
    const xTitle = svg.append('text')
      .attr("text-anchor", "middle")
      .attr("transform", "translate(" + (margin.left + margin.right + width)/2 + "," + (height + margin.top + (margin.bottom/1.2)) + ")")
      .text(xLabel)
      .style('font-size', `${16*size}px`)
         
    const x = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + (height + margin.top) + ")")
      .attr("class", "xAxis")
      .call(xAxis)
      .selectAll('text')
      .style('text-anchor', 'middle')
      .attr('dx', '-1.2em')
      .attr('dy', '-0.5em')
      .attr('transform', 'rotate(-90)');

    d3.selectAll('.xAxis>.tick>text')
      .each(function(){
        d3.select(this).style('font-size',`${12*size}px`)
      })

    const yScale = d3.scaleLinear()
      .domain([d3.max(yNumbers), 0])
      .range([0, height]);

    const yAxis = d3.axisLeft()
      .scale(yScale)
      .tickSize(6*size)
      
    const yTitle = svg.append('text')
      .attr("text-anchor", "middle")
      .attr("dx", -(margin.bottom + height/2))
      .attr("dy", margin.left/3)
      .attr("transform", "rotate(-90)")
      .text(yLabel)
      .style('font-size', `${16*size}px`)

    const y = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .attr("class", "yAxis")
      .call(yAxis)

    d3.selectAll('.yAxis>.tick>text')
      .each(function(){
        d3.select(this).style('font-size',`${12*size}px`)
      })
    
    const barChart = svg.append('g')
      .attr("transform", "translate(0," + (margin.top + margin.bottom) + ")")
      .attr("width", width)
      .attr("height", height)
      .selectAll("rect")
      .data(yNumbers)
      .enter()
      .append("rect")
      .attr("y", function(d) {
        return height - yScale(d) 
      })
      .attr("height", function(d) { 
        return yScale(d); 
      })
      .attr("width", barWidth - barPadding)
      .attr("transform", function (d, i) {
        const translate = [margin.left + barPadding/2 + barWidth * i, -margin.bottom]; 
        return "translate("+ translate +")";
      });

  }

  static getData(datasetId, choice){
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