import React from 'react';
import Router from 'react-router';
import ReactDOM from 'react-dom';
import Iso from 'iso';
import alt from './src/js/alt';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import routes from './src/routes';

let history = createBrowserHistory();

// bootstrap reads the state passed down from server.js
Iso.bootstrap(function (state, container) {
  
  // Seed state into client side alt stores
  alt.bootstrap(state);

  // Render Router/App into div#app
  ReactDOM.render(<Router history={history}>{routes}</Router>, document.getElementById('app'));
})

