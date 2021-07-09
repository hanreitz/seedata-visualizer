// global variables
const baseUrl = "http://localhost:3000"
const datasetService = new DatasetService(baseUrl)
const visualizationService = new VisualizationService(baseUrl)

const menuContainer = document.getElementById('menu-container')
const menuHolder = document.getElementById('menu-holder')
const headerHolder = document.getElementById('header-holder')
const blurArea = document.getElementById('blur')

// get current datasets
datasetService.getDatasets()

// menu creation
addMenuItem('Add New Dataset')
addMenuItem('Create New Visualization')

// function for creating menu items
function addMenuItem(item){
  const menuItem = document.createElement('p')
  menuItem.id = `menu-item-${item.toLowerCase().split(' ').join('-')}`
  menuItem.innerText = item
  menuContainer.append(menuItem)
}

// handling menu mouseover
menuHolder.addEventListener('mouseover', handleMenuMouseover)
menuHolder.addEventListener('mouseout', handleMenuMouseout)

function handleMenuMouseover(){
  menuContainer.style.display = "block"
}

function handleMenuMouseout(){
  menuContainer.style.display = "none"
}

// listening for menu clicks
menuContainer.addEventListener('click', toggleBlur)

// handling menu events
function toggleBlur(){
  blurArea.classList.toggle('active')
  if (event.target.id === 'menu-item-add-new-dataset'){
    Dataset.renderForm()
    Dataset.datasetForm.classList.toggle('active')
  } else if (event.target.id === 'menu-item-create-new-visualization'){
    Visualization.renderForm()
    Visualization.visualizationForm.classList.toggle('active')
  } 
}

// listening for background clicks
blurArea.addEventListener('click', handleBackgroundClick)

// function for handling background clicks
function handleBackgroundClick(){
  debugger;
  if(Dataset.datasetForm.className === 'active' && blurArea.className === 'content-wrapper active'){
    toggleDatasetBlur()
  } else if(Visualization.visualizationForm.className === 'active' && blurArea.className === 'content-wrapper active'){
    toggleVisSubmitBlur()
  } else if(Visualization.visualizationContainer.className === 'active' && blurArea.className === 'content-wrapper active'){
    toggleVisAreaBlur()
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
  Dataset.datasetForm.classList.toggle('active')
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

function toggleVisAreaBlur(){
  blurArea.classList.toggle('active')
  Visualization.visualizationContainer.classList.toggle('active')
}