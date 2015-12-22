import React from 'react';
import ExampleStore from '../../js/stores/ExampleStore';
import ExampleActions from '../../js/actions/ExampleActions';

export class ExampleComponent extends React.Component {
  constructor() {
    super();

    // Operations usually carried out in componentWillMount go here
    console.log('ExampleComponent.jsx Mounted!');
  }
  // In ES6 Class, initialState is simply expressed as an object
  state = {
    name : "Initial State",
    example_list : ExampleStore.getState().examples
  }

  // Updates the internal state variables via React setState fn
  updateName = () => {
    this.setState({ name: this.refs.input.value }) 
  }

  // These add/remove event listeners to the store when Component is add/remove from DOM.
  // When ExampleStore emits change, we fire our onChange function to update Component State.
  componentDidMount() {
    ExampleStore.listen(this.onChange.bind(this));
  }
  componentWillUnmount() {
    ExampleStore.unlisten(this.onChange.bind(this));
  }
  onChange = (state) => {
    this.setState({example_list : state.examples});
  }

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
      <div className="example-component">
        <h3>This is a React ExampleComponent!</h3>
        
        <h4>A component-level state demo</h4>
        <p>this.state.name: {this.state.name}</p>
        <input ref="input" type="text" />
        <button onClick={this.updateName}>Update `this.state`</button>
        
        <hr/>

        <h4>A global-level store state demo</h4>
        <ol>
        {this.state.example_list.map((ex) => {
          return (
            <li key={ex.id}>{ex.name}</li>
          );
        })}
        </ol>
        <button onClick={this.sendExampleAction}>Send StoreAction()</button>
      </div>
    );
  }
}
