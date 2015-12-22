import alt from '../alt';
import ExampleActions from '../actions/ExampleActions';

class ExampleStore {
  constructor() {
    this.examples = [
      {
        "id" : 1,
        "name" : "Foobar 1"
      },
      {
        "id" : 2,
        "name" : "Foobazz 2"
      },
      {
        "id" : 3,
        "name" : "Barfoo 3"
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