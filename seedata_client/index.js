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
menuHolder.addEventListener('mouseover', handleMenuMouseover)
menuHolder.addEventListener('mouseout', handleMenuMouseout)

// listening for menu clicks
menuContainer.addEventListener('click', toggleBlur)

// handling menu events
function toggleBlur(){
  const blur = document.getElementById('blur')
  blur.classList.toggle('active')
  // const popup = document.getElementById('popup')
  // popup.classList.toggle('active')
}
function handleMenuMouseover(){
  menuContainer.style.display = "block"
}

function handleMenuMouseout(){
  menuContainer.style.display = "none"
}

// function handleMenuClick(){
//   if (event.target.id === "menu-item-add-new-dataset"){
//     if (Dataset.datasetForm.style.display === "none"){
//       Dataset.datasetForm.style.display = "block"
//       this.toggleBlur()
//     } else {
//       Dataset.datasetForm.style.display = "none"
//     }
//   } else if (event.target.id === "menu-item-create-new-visualization"){
//     if (Visualization.visualizationForm.style.display === "none"){
//       Visualization.visualizationForm.style.display = "block"
//       this.toggleBlur()
//     } else {
//       Visualization.visualizationForm.style.display = "none"
//     }
//   }
// }

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
  this.toggleBlur()
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
  const menuItem = document.createElement('p')
  menuItem.id = `menu-item-${item.toLowerCase().split(' ').join('-')}`
  menuItem.innerText = item
  menuContainer.append(menuItem)
}