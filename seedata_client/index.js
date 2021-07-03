// global variables
const baseUrl = "http://localhost:3000"
const datasetService = new DatasetService(baseUrl)
const menuContainer = document.getElementById('menu-container')

addMenuItem('Add New Dataset')
addMenuItem('Create New Visualization')

Dataset.datasetForm.addEventListener('submit', handleDatasetSubmit)

datasetService.getDatasets()
Dataset.renderForm()

// Visualization.visualizationForm.addEventListener('submit', handleVisualizationSubmit) -- might need to be a multistep process of choosing or uploading a dataset, choosing visualization type, choosing x&y if applicable, then submitting

// visualizationService.getVisualizations() ??? maybe
// Visualization.renderForm()

function handleDatasetSubmit(){
  event.preventDefault()
  datasetService.createDataset()
}

function addMenuItem(item){
  const menuItem = document.createElement('div')
  menuItem.id = `menu-item-${item.toLowerCase().split(' ').join('-')}`
  menuItem.innerText = item
  menuContainer.append(menuItem)
}