import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import ExampleStore from '../../js/stores/ExampleStore.js';
import ExampleActionButton from './ExampleActionButton';

/*
* The Pure Component validates and display data. This is the __preferred__ method when applicable for reusability and separation of concerns.
* All state management is decoupled to a Higher Order Component (ie AltContainer),
* which can communicate with stores and pass down data as props.
*
* http://alt.js.org/docs/components/altContainer/
*/
export default class ExamplePureComponent extends React.Component {
  constructor() {
    super();
  }
  static defaultProps = {
    examples: [
      {
        "id" : 100,
        "name" : "Default Props can be enabled here."
      }
    ]
  };
  static propTypes = {
    examples: React.PropTypes.arrayOf( React.PropTypes.shape({
        id: React.PropTypes.number.isRequired,
        name: React.PropTypes.string.isRequired
    }))
  };

  render() {
    return (
      <div className="example-component">
        
        <h3>ExamplePureComponent</h3>
        <p>A pure component means it's state-less. Only responsible for displaying props.</p>
        <p>State management is decoupled to the Alt Container (Higher Order Component).</p>
        
        <hr/>
        
        <h4>A global-level store <em>props</em> demo</h4>

        <ul>
        {
          this.props.examples.map((ex) =>{
            return (
              <li key={ex.id}>{ex.name}</li>
            );
          })
        }
        </ul>

        <hr />
        <ExampleActionButton />

      </div>
    )
  }
}

