// global variables
const baseUrl = "http://localhost:3000"
const datasetService = new DatasetService(baseUrl)

Dataset.datasetForm.addEventListener('submit', handleDatasetSubmit)

datasetService.getDatasets()
Dataset.renderForm()

function handleDatasetSubmit(){
  event.preventDefault()
  datasetService.createDataset()
}