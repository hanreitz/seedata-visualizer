// only going to initialize this class once
// make all service calls related to instances of Dataset objects

class DatasetService {
  constructor(endpoint) {
    this.endpoint = endpoint
  }

  // Read/Index action

  // fetch request to grab all existing public datasets

  getDatasets() {
    fetch(`${this.endpoint}/datasets`)
    .then(resp => resp.json())
    .then(datasets => {
      debugger
      // this is where we switch to Dataset class to append stuff to DOM
    })
  }
}