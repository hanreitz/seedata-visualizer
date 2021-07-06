class Visualization {
  // make sure delete option removes from Visualization.all
  static all = []

  static visualizationContainer = document.getElementById('visualization-container')
  static visualizationForm = document.getElementById('visualization-form-container')
  static visualizationSpecForm = document.getElementById('visualization-specs-container')

  constructor({id, name, chart_type, x_choice, y_choice, dataset_id}){
    this.id = id
    this.name = name
    this.chartType = chart_type
    this.xChoice = x_choice
    this.yChoice = y_choice
    this.datasetId = dataset_id

    // this.element = document.createElement('svg')
    // this.element.id = `${this.chartType}${this.id}`

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
          <option value="bar">Bar Graph</option>
          <option value="line">Line Graph</option>
          <option value="pie">Pie Chart</option>
          <option value="table">Data Table</option>
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
        <input type="hidden" id="pass_name" value=${name.toLowerCase().replaceAll(' ','-')}>
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
    const xData = Visualization.getData(this.datasetId, this.xChoice)
    const xLabel = xData[0]
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
      this.renderBarChart(xAxisLabels, yNumbers, xLabel, yLabel)
    }
  }

  renderBarChart(xAxisLabels, yNumbers, xLabel, yLabel){
    const width = 700
    const height = 500
    const barPadding = 5
    const barWidth = ((width - 50) / yNumbers.length)
        
    const svg = d3.select('svg')
      .attr("width", width)
      .attr("height", height);
        
    const xScale = d3.scaleBand()
      .domain(xAxisLabels)
      .range([0, width])

    const xAxis = d3.axisBottom()
      .scale(xScale)
    
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(yNumbers)])
      .range([0, height]);

    const yAxis = d3.axisLeft()
      .scale(yScale)
    
    svg.append("g")
      .attr("transform", "translate(50, 10)")
      .call(yAxis);

    const xAxisTranslate = height - 20;
         
    svg.append("g")
      .attr("transform", "translate(50, " + xAxisTranslate  +")")
      .call(xAxis);
    
    const barChart = svg.selectAll("rect")
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
        const translate = [50 + barWidth * i, -20]; 
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