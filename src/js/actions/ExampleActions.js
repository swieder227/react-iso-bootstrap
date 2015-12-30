import alt from '../alt';

class ExampleActions {
  updateExamples(examples) {
    return examples;
  }
  appendExample(example) {
    return example;
  }
}

module.exports = alt.createActions(ExampleActions);