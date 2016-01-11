import React from 'react';
import ExampleStore from '../../js/stores/ExampleStore';
import ExampleActions from '../../js/actions/ExampleActions';

export default class ExampleActionButton extends React.Component {
  constructor() {
    super();
  }
  
  handleExampleAppend = () => {
    let example = {
      id: (new Date().getTime()),
      name: this.refs.input.value
    }
    ExampleActions.appendExample(example);
  };


  sendExampleAction() {
    ExampleActions.updateExamples(
      [
        {
          "id" : 10,
          "name" : "Stores allows components to easily communicate."
        },
        {
          "id" : 20,
          "name" : "While centralizing the data and logic."
        }
      ]
    )
  }

  render() {
    return (
      <div>
        <input ref="input" />
        <button onClick={this.handleExampleAppend}>Upate global Store via Action()</button>
      </div>
    );
  }
}