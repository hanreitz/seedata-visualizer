class Dataset {
  // make sure delete option removes from Dataset.all
  static all = []

  static datasetContainer = document.getElementById('dataset-container')
  static datasetForm = document.getElementById('form-container')

  constructor({id, name, contents, user_id}){
    this.id = id
    this.name = name
    this.contents = contents
    this.user_id = user_id

    this.element = document.createElement('li')
    this.element.id = `dataset-${this.id}`

    Dataset.all.push(this)
  }

  datasetListElement(){
    this.element.innerHTML += `
      <div>
        <h3>${this.name}</h3>
      </div>
    `
    return this.element
  }

  addToDom(){
    Dataset.datasetContainer.appendChild(this.datasetListElement())
  }

  renderForm(){
    Dataset.datasetForm.innerHTML += `
      <form id="new-dataset-form">
        <label for="name">Dataset name:</label>
        <input type="text" id="name">
        <label for="description">Brief description:</label>
        <input type="text" id="description">
        <label for="file-upload">Choose a CSV file:</label>
        <input type="file" id="file-upload" accept=".csv">
    `
  }
}