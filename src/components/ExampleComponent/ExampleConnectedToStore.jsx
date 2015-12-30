import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import ExampleStore from '../../js/stores/ExampleStore';
import ExampleActionButton from './ExampleActionButton';

/*
* This is a mostly "Pure" Component. Here's why... 
* It's pure because it's only intended to display immutable data, and state is decoupled into the Store and passed down via props.
* However, the store-connection functionality is baked into the component via the connectToStores(), getStores(), & getPropsFromStores() utility methods from Alt.js
*
* https://github.com/altjs/connect-to-stores
*/
class ExampleConnectedToStore extends React.Component {
  constructor() {
    super();
  }
  
  static getStores(props) {
    return [ExampleStore]
  }
  static getPropsFromStores(props) {
    return ExampleStore.getState()
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
        
        <h3>ExampleConnectedToStore</h3>
        <p>State management is abstracted out of the component and into the store via the connectToStores (Higher Order Method) utility from Alt.js</p>
        
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

export default ExampleConnectedToStore = connectToStores(ExampleConnectedToStore);