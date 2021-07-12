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

  visualizationElement(){
    if(this.chartType != 'table'){
    this.element.innerHTML += `
      <svg id='visualization-${this.id}'></svg>
    `
    }
    return this.element
  }

  addToDom(){
    Visualization.visCardContainer.appendChild(this.visualizationElement())
    if(this.chartType === 'table'){
      const renderTarget = this.element
      this.renderVisualization(this.name, 0.35, renderTarget) 
    } else {
      const renderTarget = this.element.firstElementChild
      this.renderVisualization(this.name, 0.35, renderTarget) 
    } 
  }

  static renderForm(input){
    Visualization.visualizationForm.innerHTML = ''
    Visualization.visualizationForm.innerHTML += `
      <h3>Create a New Visualization</h3>
      <form id="new-visualization-form">
        Visualization name: <input type="text" id="visualization-name"><br><br>
        Choose a dataset: <select id="select-dataset">
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
    if(!input){
      for (const d of Dataset.all){
        d.addOptionToSelect();
      }
    }else {
      const d = Dataset.all.find(data => data.name === input)
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
    if (event.target.id === 'delete-button'){
      Visualization.visualizationContainer.firstElementChild.remove()
      Visualization.visualizationContainer.lastElementChild.remove()
      Visualization.visualizationContainer.innerHTML += `
        <svg id="vis-popup"></svg>
      `
      blurArea.classList.toggle('active')
      Visualization.visualizationContainer.classList.toggle('active')
      const visId = parseInt(event.target.dataset.id)
      document.getElementById(`vis-card-${visId}`).remove()
      const visualization = Visualization.all.find(v => v.id === visId)
      const visInd = Visualization.all.indexOf(visualization)
      Visualization.all.splice(0,Visualization.all.length)
      visualizationService.deleteVisualization(visId)
      Visualization.visCardContainer.innerHTML = ''
      Dataset.all.splice(0,Dataset.all.length)
      visualizationService.getVisualizations()
    } else if(targetDiv.parentElement === Visualization.visCardContainer || targetDiv === Visualization.visCardContainer){
      const visId = parseInt(targetDiv.id.split('-')[2])
      const visualization = Visualization.all.find(v => v.id === visId)
      const visPopup = document.getElementById('vis-popup')
      visPopup.innerHTML = ''
      visPopup.dataset.id = visId
      blurArea.classList.toggle('active')
      Visualization.visualizationContainer.classList.toggle('active')
      visualization.renderVisualization(visualization.name, 1, visPopup)
      const deleteButton = document.createElement('button')
      deleteButton.id = 'delete-button'
      deleteButton.dataset.id = visId
      deleteButton.type = 'submit'
      deleteButton.innerText = 'Delete Visualization'
      Visualization.visualizationContainer.append(deleteButton)
    } else if (targetDiv === Visualization.visualizationContainer && targetDiv.firstElementChild.tagName === 'TABLE'){
      const visId = parseInt(targetDiv.firstElementChild.dataset.id)
      targetDiv.innerHTML = ''
      targetDiv.innerHTML += `
        <svg id="vis-popup"></svg>
      `
      const visualization = Visualization.all.find(v => v.id === visId)
      const card = document.getElementById(`vis-card-${visId}`)
      const renderTarget = card.firstElementChild
      renderTarget.innerHTML = ''
      blurArea.classList.toggle('active')
      Visualization.visualizationContainer.classList.toggle('active')
      visualization.renderVisualization(visualization.name, 0.35, renderTarget)
    } else if(targetDiv.id != 'visualization-card-container'){
      Visualization.visualizationContainer.lastElementChild.remove()
      const visId = parseInt(targetDiv.firstElementChild.dataset.id)
      const visualization = Visualization.all.find(v => v.id === visId)
      const card = document.getElementById(`vis-card-${visId}`)
      const renderTarget = card.firstElementChild
      renderTarget.innerHTML = ''
      blurArea.classList.toggle('active')
      Visualization.visualizationContainer.classList.toggle('active')
      visualization.renderVisualization(visualization.name, 0.35, renderTarget)
    }
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
      }
      const xAxisLabels = [];
      for(const e of xValues){
        xAxisLabels.push(e)
      }
      this.renderBarChart(xAxisLabels, yNumbers, xLabel, yLabel, passName, size, renderTarget)
    } else if (this.chartType === 'line'){
      const xNumbers = [];
      for(const e of xValues){
        xNumbers.push(parseFloat(e))
      }
      const yNumbers = [];
      for(const e of yValues){
        yNumbers.push(parseFloat(e))
      }
      this.renderLineGraph(xNumbers, yNumbers, xLabel, yLabel, passName, size, renderTarget)
    } else if (this.chartType === 'pie'){
      const labels = [];
      for(const e of xValues){
        labels.push(e)
      }
      const yNumbers = [];
      for(const e of yValues){
        yNumbers.push(parseFloat(e))
      }
      this.renderPieChart(labels, yNumbers, passName, size, renderTarget)
    } else if (this.chartType === 'table'){
      if(renderTarget === document.getElementById('vis-popup')){
        const tableRender = renderTarget.parentElement
        tableRender.firstElementChild.remove()
        this.renderDataTable(xData, yData, passName, size, tableRender)
      } else {
        this.renderDataTable(xData, yData, passName, size, renderTarget)
      }
    }
  }

  static toggleVisBlur(){
    const blur = document.getElementById('blur')
    blur.classList.toggle('active')
    Visualization.visualizationContainer.classList.toggle('active')
  }

  renderBarChart(xAxisLabels, yNumbers, xLabel, yLabel, name, size, renderTarget){
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
    
    let color = d3.scaleOrdinal(d3.schemeCategory10)

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
      })
  }

  renderLineGraph(xNumbers, yNumbers, xLabel, yLabel, name, size, renderTarget){
    const dataset = []
    for(let i=0; i<xNumbers.length; i++){
      dataset.push({
        xVal: xNumbers[i],
        yVal: yNumbers[i]
      })
    }
    const margin = {left: 50*size, right: 20*size, top: 50*size, bottom: 50*size}
    const width = size*(700 - (margin.right + margin.left))
    const height = size*(500 - (margin.top + margin.bottom))

    const svg = d3.select(renderTarget)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.bottom + margin.top);

    const chartTitle = svg.append('text')
      .attr("text-anchor", "middle")
      .attr("transform", "translate(" + (width + margin.left + margin.right)/2 + "," + margin.top/2 + ")")
      .text(name)
      .style('font-size', `${24*size}px`)
          
    const g = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      
    const xScale = d3.scaleLinear()
      .domain([d3.min(xNumbers),d3.max(xNumbers)])
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

    d3.selectAll('.xAxis>.tick>text')
      .each(function(){
        d3.select(this).style('font-size',`${12*size}px`)
      })
      
    const yScale = d3.scaleLinear()
      .domain([d3.min(yNumbers), d3.max(yNumbers)])
      .range([height, 0]);

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
      
    const line = d3.line()
      .x(d => xScale(d.xVal))
      .y(d => yScale(d.yVal))

    const addLine = g.append('path')
      .datum(dataset)
      .attr('class', 'line')
      .attr('fill','none')
      .attr('stroke','black')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 1.5*size)
      .attr('d', line)
  }

  renderPieChart(labels, yNumbers, passName, size, renderTarget){
    const margin = {left: 50*size, right: 50*size, top: 50*size, bottom: 50*size}
    const width = size*(700 - (margin.right + margin.left))
    const height = size*(700 - (margin.top + margin.bottom))
    const radius = size*(Math.min(width, height)/2)

    const svg = d3.select(renderTarget)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.bottom + margin.top);

    const chartArea = svg.append('g')
      .attr("transform", "translate(" + (margin.left + radius) + "," + (margin.top + radius) + ")")
    
    let color = d3.scaleOrdinal(d3.schemeCategory10)

    const piePiece = d3.pie().value(d => d)

    const path = d3.arc()
      .outerRadius(radius)
      .innerRadius(0)

    const arc = chartArea.selectAll('arc')
      .data(piePiece(yNumbers))
      .enter()
      .append('g')

    arc.append('path')
      .attr('d', path)
      .attr('fill', d => color(d.data))

    const label = d3.arc()
      .outerRadius(radius)
      .innerRadius(0)

    arc.append('text')
      .attr('transform', function(d) {
        return 'translate(' + label.centroid(d) + ')';
      })
      .attr('text-anchor', 'middle')
      .text(function(d) {
        return labels[d.index] + ":" + d.data + "%"
      })

    d3.selectAll('text')
      .attr('font-size', `${12*size}px`)

    const chartTitle = svg.append('text')
      .attr("text-anchor", "middle")
      .attr("transform", "translate(" + (width + margin.left + margin.right)/2 + "," + margin.top/2 + ")")
      .text(passName)
      .style('font-size', `${24*size}px`)
  }

  renderDataTable(xData, yData, passName, size, renderTarget){
    const table = document.createElement('table')
    table.dataset.id = `${this.id}`
    table.innerHTML += `
      <p style='font-size:${24*size}px'>${passName}</p>
      <br>
      <tr style='text-align:left'>
      <th style='font-size:${18*size}px'>${xData[0]}</th>
      <th style='font-size:${18*size}px'>${yData[0]}</th>
      </tr>
    `
    for(let i = 1; i<xData.length; i++){
      table.innerHTML += `
      <tr style='font-size:${14*size}px'>
      <td>${xData[i]}</td>
      <td>${yData[i]}</td>
      </tr>
      `
    }
    // if(renderTarget === document.getElementById(`vis-card-${this.id}`)){
      renderTarget.append(table)
    // } else {
    //   console.log(renderTarget)
    // }
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