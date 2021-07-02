class Dataset {
  // make sure delete option removes from Dataset.all
  static all = []

  static datasetContainer = document.getElementById('dataset-container')
  static datasetForm = document.getElementById('form-container')

  constructor({id, name, description, contents}){
    this.id = id
    this.name = name
    this.description = description
    this.contents = contents

    this.element = document.createElement('li')
    this.element.id = `dataset-${this.id}`

    Dataset.all.push(this)
  }

  datasetListElement(){
    this.element.innerHTML += `
      <div>
        <h3>${this.name}</h3>
        <p>${this.description}</p>
      </div>
    `
    return this.element
  }

  addToDom(){
    Dataset.datasetContainer.appendChild(this.datasetListElement())
  }

  static renderForm(){
    Dataset.datasetForm.innerHTML += `
      <h3>Add a New Dataset</h3>
      <form id="new-dataset-form">
        Dataset name: <input type="text" id="dataset-name"><br><br>
        Brief description: <input type="text" id="dataset-description"><br><br>
        Choose a CSV file: <input type="file" id="dataset-upload" accept=".csv"><br><br>
        <input type="submit">
      </form>
    `
  }
}