import React from 'react';
import AltContainer from 'alt-container'
import ExampleStore from '../../js/stores/ExampleStore';
import ExamplePureComponent from './ExamplePureComponent';

/*
* This is a wrapper component that bundles the AltContainer (store connection) to the Pure Component (view logic only)
*
* http://alt.js.org/docs/components/altContainer/
*/
export default class ExamplePureContainer extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <AltContainer store={ExampleStore}>
        <ExamplePureComponent />
      </AltContainer>
    )
  }
}