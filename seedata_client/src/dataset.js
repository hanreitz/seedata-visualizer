class Dataset {
  // make sure delete option removes from Dataset.all
  static all = []

  static datasetContainer = document.getElementById('dataset-container')
  static datasetForm = document.getElementById('dataset-form-container')

  constructor({id, name, description, contents}){
    this.id = id
    this.name = name
    this.description = description
    this.contents = contents

    this.element = document.createElement('div')
    this.element.id = `dataset-${this.id}`

    Dataset.all.push(this)
  }

  datasetElement(){
    this.element.innerHTML += `
      <p><strong>${this.name}</strong> - ${this.description}</p>
    `
    return this.element
  }

  addToDom(){
    Dataset.datasetContainer.appendChild(this.datasetElement())
  }

  addOptionToSelect(){
    const selectDataset = document.getElementById('select-dataset')
    selectDataset.options.add(new Option(this.name, this.id))
  }

  static renderForm(){
    Dataset.datasetForm.innerHTML = ''
    Dataset.datasetForm.innerHTML += `
      <h3>Add a New Dataset</h3>
      <form id="new-dataset-form">
        Dataset name: <input type="text" id="dataset-name"><br><br>
        Brief description: <input type="text" id="dataset-description"><br><br>
        Choose a CSV file: <input type="file" id="dataset-upload" accept=".csv"><br><br>
        <input type="submit" id='dataset-submit'>
      </form>
    `
  }
}