// only going to initialize this class once
// make all service calls related to instances of Visualization objects

class VisualizationService {
  constructor(endpoint) {
    this.endpoint = endpoint
  }

  // Read/Index action

  // fetch request to grab all existing visualizations

  // getVisualizations() {
  //   fetch(`${this.endpoint}/visualizations`)
  //   .then(resp => resp.json())
  //   .then(visualizations => {
  //     for (const visualization of visualizations){
  //       const v = new Visualization(visualization)
  //       v.addToDom()
  //     }
  //   })
  // }

  createVisualization(){
    const types = document.getElementsByName('type')
    for(let i=0; i<types.length; i++) {
      if(types[i].checked) {
        const type = types[i].value
        return type
      }
    }
    const svg = document.getElementById('svg') // loop through and get them all

    const visualization = {
      name: document.getElementById('visualization-name').value,
      type: document.getElementById(''),
      svg_specs: svg,
      dataset_id: document.getElementById('select-dataset').value
    }
  
    const configObj = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(visualization)
    }
    
    fetch(`${this.endpoint}/visualization`, configObj)
    .then(resp => resp.json())
    .then(visualization => {
      const v = new Visualization(visualization)
      v.addToDom()
    })
  }

}