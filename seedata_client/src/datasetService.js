// only going to initialize this class once
// make all service calls related to instances of Dataset objects

class DatasetService {
  constructor(endpoint) {
    this.endpoint = endpoint
  }

// Read/Index action

  async getDatasets() {
    await fetch(`${this.endpoint}/datasets`)
    .then(resp => resp.json())
    .then(datasets => {
      for (const dataset of datasets){
        const d = new Dataset(dataset)
        d.addToDom()
      }
    })
  }

// Create action

  createDataset(){
    let formData = new FormData() 
    formData.append('name', document.getElementById("dataset-name").value)
    formData.append('description', document.getElementById("dataset-description").value)
    formData.append('contents', document.getElementById("dataset-upload").files[0])
  
    const configObj = {
      method: "POST",
      body: formData
    }
    
    fetch(`${this.endpoint}/datasets`, configObj)
    .then(resp => resp.json())
    .then(dataset => {
      const d = new Dataset(dataset)
      d.addToDom()
    })
  }
}