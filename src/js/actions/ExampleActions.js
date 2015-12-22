import alt from '../alt';

class ExampleActions {
  updateExamples(examples) {
    return examples;
  }
}

window.ExampleActions = ExampleActions;

module.exports = alt.createActions(ExampleActions);