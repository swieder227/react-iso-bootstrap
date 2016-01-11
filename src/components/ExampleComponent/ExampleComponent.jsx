import React from 'react';
import ExampleStore from '../../js/stores/ExampleStore';
import ExampleActions from '../../js/actions/ExampleActions';
import ExampleActionButton from './ExampleActionButton';

export default class ExampleComponent extends React.Component {
  constructor() {
    super();

    // Operations usually carried out in componentWillMount go here
    console.log('ExampleComponent.jsx Mounted!');
  }
  // In ES6 Class, initialState is simply expressed as an object
  state = {
    name : "Initial State",
    example_list : ExampleStore.getState().examples
  };

  // Updates the internal state variables via React setState()
  updateName = () => {
    this.setState({ name: this.refs.input.value });
  };

  // These add/remove event listeners to the store when Component is add/remove from DOM.
  // When ExampleStore emits change, we fire our onChange function to update Component State.
  // Look at ConnectedToStore/PureComponent examples to see how to extrapolate these functions.
  componentDidMount = () => {
    ExampleStore.listen(this.onChange);
  };

  componentWillUnmount = () => {
    ExampleStore.unlisten(this.onChange);
  };

  onChange = (state) => {
    this.setState({example_list : state.examples});
  };

  render() {
    return (
      <div className="example-component">
        <h3>ExampleComponent</h3>
        
        <h4>A component-level state demo</h4>
        <p>this.state.name: {this.state.name}</p>
        <input ref="input" type="text" />
        <button onClick={this.updateName}>Update `this.state`</button>
        
        <hr/>

        <h4>A global-level store <em>state</em> demo</h4>
        <ol>
        {this.state.example_list.map((ex) => {
          return (
            <li key={ex.id}>{ex.name}</li>
          );
        })}
        </ol>

        <hr />
        <ExampleActionButton />

      </div>
    );
  }
}
