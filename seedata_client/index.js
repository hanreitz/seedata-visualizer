// global variables
const baseUrl = "http://localhost:3000"
const datasetService = new DatasetService(baseUrl)
const visualizationService = new VisualizationService(baseUrl)
const menuContainer = document.getElementById('menu-container')

// menu creation
addMenuItem('Add New Dataset')
addMenuItem('Create New Visualization')

// listening for form submissions
Dataset.datasetForm.addEventListener('submit', handleDatasetSubmit)
Visualization.visualizationForm.addEventListener('submit', handleVisualizationSubmit)

// showing current datasets
datasetService.getDatasets()

// rendering forms
Dataset.renderForm()
Visualization.renderForm()


// Visualization.visualizationForm.addEventListener('submit', handleVisualizationSubmit) -- might need to be a multistep process of choosing or uploading a dataset, choosing visualization type, choosing x&y if applicable, then submitting

// visualizationService.getVisualizations() ??? maybe

// functions for handling form submissions

function handleDatasetSubmit(){
  event.preventDefault()
  datasetService.createDataset()
  event.target.reset()
}

function handleVisualizationSubmit(){
  event.preventDefault()
  // Trigger form about x/y
  // Handle specific form types
  event.target.reset()
}

// function for creating menu items

function addMenuItem(item){
  const menuItem = document.createElement('div')
  menuItem.id = `menu-item-${item.toLowerCase().split(' ').join('-')}`
  menuItem.innerText = item
  menuContainer.append(menuItem)
}