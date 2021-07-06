// global variables
const baseUrl = "http://localhost:3000"
const datasetService = new DatasetService(baseUrl)
const visualizationService = new VisualizationService(baseUrl)
const menuContainer = document.getElementById('menu-container')
const menuHolder = document.getElementById('menu-holder')

// get current datasets
datasetService.getDatasets()

// menu creation
addMenuItem('Add New Dataset')
addMenuItem('Create New Visualization')

// handling menu mouseover
menuHolder.addEventListener('mouseenter', handleMenuMouseover)

// listening for menu clicks
menuContainer.addEventListener('click', handleMenuClick)

// handling menu events
function handleMenuMouseover(){
  if (menuContainer.style.display === "none"){
    menuContainer.style.display === "block"
  }
}

function handleMenuClick(){
  if (event.target.id === "menu-item-add-new-dataset"){
    if (Dataset.datasetForm.style.display === "none"){
      Dataset.datasetForm.style.display = "block"
    } else {
      Dataset.datasetForm.style.display = "none"
    }
  } else if (event.target.id === "menu-item-create-new-visualization"){
    if (Visualization.visualizationForm.style.display === "none"){
      Visualization.visualizationForm.style.display = "block"
    } else {
      Visualization.visualizationForm.style.display = "none"
    }
  }
}

// render forms
Dataset.renderForm()
Visualization.renderForm()

// listening for form submissions
Dataset.datasetForm.addEventListener('submit', handleDatasetSubmit)
Visualization.visualizationForm.addEventListener('submit', handleVisualizationSubmit)
Visualization.visualizationSpecForm.addEventListener('submit', handleVisSpecSubmit)

// functions for handling form submissions
function handleDatasetSubmit(){
  event.preventDefault()
  datasetService.createDataset()
  event.target.reset()
}

function handleVisualizationSubmit(){
  event.preventDefault()
  Visualization.renderSpecForm()
  event.target.reset()
}

function handleVisSpecSubmit(){
  event.preventDefault()
  Visualization.visualizationContainer.style.display = "block"
  visualizationService.createVisualization()
  event.target.reset()
}

// function for creating menu items

function addMenuItem(item){
  const menuItem = document.createElement('div')
  menuItem.class = "menu-items"
  menuItem.id = `menu-item-${item.toLowerCase().split(' ').join('-')}`
  menuItem.innerText = item
  menuContainer.append(menuItem)
}