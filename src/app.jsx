import React from 'react';
import {Link, IndexLink} from 'react-router';

// Main React UI Element
export default class App extends React.Component {
  render() {
    return (
      <div>
        This is ./src/app.jsx<hr/>
        {/* Static. E.g. may be replaced with a <Header /> Component */}
        <button><IndexLink activeClassName="active" to="/">Example - Basic</IndexLink></button>
        <button><Link activeClassName="active" to="/connected">Example - connectToStores()</Link></button>
        <button><Link activeClassName="active" to="/pure">Example - AltContainer > PureComponent </Link></button>
        
        {/* Dynamic content decided by the Router */}
        {this.props.children}

      </div>
    )
  }
}