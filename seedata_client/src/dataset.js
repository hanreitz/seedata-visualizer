class Dataset {
  // make sure delete option removes from Dataset.all
  static all = []

  static datasetDropdown = document.getElementById('current-datasets')
  static datasetForm = document.getElementById('dataset-form-container')
  static datasetContainer = document.getElementById('dataset-container')

  constructor({id, name, description, contents}){
    this.id = id
    this.name = name
    this.description = description
    this.contents = contents

    this.element = new Option(`${this.name}`)
    this.element.id = `dataset-${this.id}`

    Dataset.all.push(this)
  }

  addToDom(){
    Dataset.datasetDropdown.add(this.element, undefined)
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