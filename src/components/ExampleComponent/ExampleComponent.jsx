import React from 'react';

export class ExampleComponent extends React.Component {
  constructor() {
    super();
    console.log('ExampleComponent.jsx Mounted!');
  }
  state = {
    name: "Initial State"
  }

  updateName = () => {
    this.setState({ name: this.refs.input.value }) 
  }

  render() {
    return (
      <div className="example-component">
        <h3>This is a React ExampleComponent!</h3>
        <p>this.state.name: {this.state.name}</p>
        <input ref="input" type="text" />
        <button onClick={this.updateName}>Update Name</button>
      </div>
    );
  
  }
}
