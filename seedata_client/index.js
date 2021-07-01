// global variables
const baseUrl = "http://localhost:3000"
const datasetService = new DatasetService(baseUrl)

datasetService.getDatasets()
Dataset.renderForm()
// initializations of the application