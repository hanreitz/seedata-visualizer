// only going to initialize this class once
// make all service calls related to instances of Dataset objects

class DatasetService {
  constructor(endpoint) {
    this.endpoint = endpoint
  }

  // Read/Index action

  // fetch request to grab all existing datasets

  getDatasets() {
    fetch(`${this.endpoint}/datasets`)
    .then(resp => resp.json())
    .then(datasets => {
      for (const dataset of datasets){
        const d = new Dataset(dataset)
        d.addToDom()
      }
    })
  }

  createDataset(){
    const dataset = {
      name: document.getElementById("dataset-name").value,
      description: document.getElementById("dataset-description").value,
      contents: document.getElementById("dataset-upload").files[0],
      user_id: 1
    }

    const configObj = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataset)
    }

    fetch(`${this.endpoint}/datasets`)
    .then(resp => resp.json())
    .then(dataset => {
      console.log(dataset)
    })
  }
}