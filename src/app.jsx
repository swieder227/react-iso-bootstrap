'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Link, IndexLink, IndexRoute} from 'react-router';

import ExampleComponent from './components/ExampleComponent/ExampleComponent';
import ExampleConnectedToStore from './components/ExampleComponent/ExampleConnectedToStore';
import ExamplePureContainer from './components/ExampleComponent/ExamplePureContainer';
import ExampleActionButton from './components/ExampleComponent/ExampleActionButton';

// Main React UI Element
const App = React.createClass({
  render() {
    return (
      <div>
        Coming from app.jsx
        <hr/>        
        {/* Static. E.g. may be replaced with a <Header /> Component */}
        <button><IndexLink activeClassName="foo" to="/">Example - Basic</IndexLink></button>
        <button><Link activeClassName="foo" to="/connected">Example - connectToStores()</Link></button>
        <button><Link activeClassName="foo" to="/pure">Example - AltContainer > PureComponent </Link></button>
        
        {/* Dynamic content decided by the Router */}
        {this.props.children}

      </div>
    )
  }
});

// Render to the DOM
ReactDOM.render((
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={ExampleComponent} />
      <Route path="connected" component={ExampleConnectedToStore} />
      <Route path="pure" component={ExamplePureContainer} />
    </Route>
  </Router>
), document.getElementById('main-ui'));

