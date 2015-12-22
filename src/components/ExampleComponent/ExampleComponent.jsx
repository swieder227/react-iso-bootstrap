import React from 'react';
import ExampleStore from '../../js/stores/ExampleStore';

export class ExampleComponent extends React.Component {
  constructor() {
    super();

    // Operations usually carried out in componentWillMount go here
    console.log('ExampleComponent.jsx Mounted!');
  }
  // In ES6 Class, initialState is simply expressed as an object
  state = {
    name : "Initial State",
    example_list : ExampleStore.getState()
  }

  // Updates the internal state variables via React setState fn
  updateName = () => {
    this.setState({ name: this.refs.input.value }) 
  }

  // These add/remove event listeners to the store when Component is add/remove from DOM.
  // When ExampleStore emits change, we fire our onChange function to update Component State.
  componentDidMount() {
    ExampleStore.listen(this.onChange);
  }
  componentWillUnmount() {
    ExampleStore.unlisten(this.onChange);
  }
  onChange(state) {
    this.setState(state);
  }

  render() {
    return (
      <div className="example-component">
        <h3>This is a React ExampleComponent!</h3>
        
        <h4>A component-level state demo</h4>
        <p>this.state.name: {this.state.name}</p>
        <input ref="input" type="text" />
        <button onClick={this.updateName}>Update Name</button>
        
        <hr/>

        <h4>A store-connection state demo</h4>
        {this.state.example_list.examples.map((ex) => {
          return (
            <p key={ex.id}>{ex.name}</p>
          );
        })}
      </div>
    );
  }
}
