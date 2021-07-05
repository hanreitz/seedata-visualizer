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

  // Create/Post action

  createVisualization(){
    const visualization = {
      name: document.getElementById('pass_name').value,
      chart_type: document.getElementById('pass_type').value,
      x_choice: parseInt(document.getElementById('x-data').value),
      y_choice: parseInt(document.getElementById('y-data').value),
      dataset_id: parseInt(document.getElementById('pass_dataset_id').value)
    }

    const configObj = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(visualization)
    }
    
    fetch(`${this.endpoint}/visualizations`, configObj)
    .then(resp => resp.json())
    .then(visualization => {
      const v = new Visualization(visualization)
      v.renderVisualization()
    })
  }

}