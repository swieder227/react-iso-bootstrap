import alt from '../alt';
import ExampleActions from '../actions/ExampleActions';

class ExampleStore {
  constructor() {
    this.examples = [
      {
        "id" : 1,
        "name" : "Default data in Store"
      },
      {
        "id" : 2,
        "name" : "Accessed across Components"
      },
      {
        "id" : 3,
        "name" : "Centralized data storage"
      }
    ];

    this.bindListeners({
      handleUpdateExamples: ExampleActions.UPDATE_EXAMPLES
    });
  }

  handleUpdateExamples(examples){
    this.examples = examples;
    // optionally return false to suppress the store change event
  }

  
}

module.exports = alt.createStore(ExampleStore, 'ExampleStore');