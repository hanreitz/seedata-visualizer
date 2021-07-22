// global variables
const baseUrl = "http://localhost:3000"
const datasetService = new DatasetService(baseUrl)
const visualizationService = new VisualizationService(baseUrl)

const menuContainer = document.getElementById('menu-container')
const menuHolder = document.getElementById('menu-holder')
const headerHolder = document.getElementById('header-holder')
const blurArea = document.getElementById('blur')
const datasetButton = document.getElementById('new-dataset-button')

const searchBarContainer = document.getElementById('search-bar-container')

// get current datasets and visualizations (datasets called within visualizations to avoid race conditions)
visualizationService.getVisualizations()

// load search bar onto page
function loadSearchBar(){
  const searchForm = document.createElement('form')
  searchForm.innerHTML += `
    Search for a Visualization: <input type='text' id='search-bar'>
  `
  searchBarContainer.append(searchForm)
}

// calling for a load of the search bar
loadSearchBar()

// listening for changes to the search bar
searchBarContainer.firstElementChild.addEventListener('input', handleSearchBarChange)

// handling search bar changes
function handleSearchBarChange(){
  const input = event.target.value.replace(' ','-').toLowerCase()
  const displayVis = Visualization.all.filter(visualization => visualization.name.slice(0, input.length) === input)
  const displayDivs = displayVis.map(visualization => `vis-card-${visualization.id}`)
  Visualization.visCardContainer.innerHTML = ''
  displayVis.forEach(visualization => {
    visualization.addToDom()
  })
}

// handling dataset clicks
Dataset.datasetDropdown.addEventListener('change', handleDatasetSelect)

function handleDatasetSelect(){
  Visualization.renderForm(event.target.value)
  Dataset.datasetDropdown.selectedIndex = 0;
  blurArea.classList.toggle('active')
  Visualization.visualizationForm.classList.toggle('active')
}

// handling visualization clicks
Visualization.visCardContainer.addEventListener('click', Visualization.handleVisualizationClick)
Visualization.visualizationContainer.addEventListener('click', Visualization.handleVisualizationClick)

// listening for new dataset button clicks
blurArea.addEventListener('click', handleNewDataset)

// handling the new dataset button
function handleNewDataset(){
  if(event.target.id === 'new-dataset-button'){
    toggleDatasetBlur()
  }
}

// listening for form exit (non-submit) clicks
Dataset.datasetForm.addEventListener('click', handleExitClick)
Visualization.visualizationForm.addEventListener('click', handleExitClick)

// function for handling form exit (non-submit) clicks
function handleExitClick(){
  if(Dataset.datasetForm.className === 'active' && blurArea.className === 'active' && event.target.parentElement.tagName != 'FORM'){
    toggleDatasetBlur()
  } else if(Visualization.visualizationForm.className === 'active' && blurArea.className === 'active' && event.target.parentElement.tagName != 'FORM'){
    toggleVisSubmitBlur()
  } 
}

// listening for form submissions
Dataset.datasetForm.addEventListener('submit', toggleDatasetBlur)
Dataset.datasetForm.addEventListener('submit', handleDatasetSubmit)
Visualization.visualizationForm.addEventListener('change', handleVisualizationSelect)
Visualization.visualizationForm.addEventListener('submit', handleVisualizationSubmit)
Visualization.visualizationForm.addEventListener('submit', toggleVisSubmitBlur)

// functions for handling form submissions
function handleDatasetSubmit(){
  event.preventDefault()
  datasetService.createDataset()
  event.target.reset()
}

function toggleDatasetBlur(){
  blurArea.classList.toggle('active')
  if(event.target.id === 'new-dataset-button'){
    Dataset.renderForm()
    Dataset.datasetForm.classList.toggle('active')
  } else {
    Dataset.datasetForm.classList.toggle('active')
  }
}

function handleVisualizationSelect(){
  if (event.target.id === "visualization-types"){
    Visualization.renderSpecForm()
  }
}

function handleVisualizationSubmit(){
  event.preventDefault()
  visualizationService.createVisualization()
  event.target.reset()
}

function toggleVisSubmitBlur(){
  blurArea.classList.toggle('active')
  Visualization.visualizationForm.classList.toggle('active')
}