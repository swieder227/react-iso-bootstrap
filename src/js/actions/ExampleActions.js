import alt from '../alt';

class ExampleActions {
  updateExamples(examples) {
    return examples;
  }
}

module.exports = alt.createActions(ExampleActions);