class Dataset {
  static all = []
  static datasetContainer = document.getElementById('dataset-container')
  // make sure delete option removes from Dataset.all

  constructor(id, name, contents, user_id){
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
    Dataset.datasetContainer.appendChild(datasetListElement)
  }
}