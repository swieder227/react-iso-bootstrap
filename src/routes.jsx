import React from 'react';
import ReactDOM from 'react-dom';

import App from './app.jsx';
import {Router, Route, Link, IndexLink, IndexRoute} from 'react-router';

import ExampleComponent from './components/ExampleComponent/ExampleComponent';
import ExampleConnectedToStore from './components/ExampleComponent/ExampleConnectedToStore';
import ExamplePureContainer from './components/ExampleComponent/ExamplePureContainer';
import ExampleActionButton from './components/ExampleComponent/ExampleActionButton';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={ExampleComponent} />
    <Route path="connected" component={ExampleConnectedToStore} />
    <Route path="pure" component={ExamplePureContainer} />
  </Route>
);
