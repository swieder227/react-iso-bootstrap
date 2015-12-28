'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import {ExampleComponent} from './components/ExampleComponent/ExampleComponent';
import {ExampleConnectedToStore} from './components/ExampleComponent/ExampleConnectedToStore';

import AltContainer from 'alt-container'
import ExampleStore from './js/stores/ExampleStore';
import {ExamplePureComponent} from './components/ExampleComponent/ExamplePureComponent';

/*
** Main React Render Fn
*/
ReactDOM.render(
<div>
  
  <ExampleComponent />
  <ExampleComponent />

  <ExampleConnectedToStore />

  <AltContainer store={ExampleStore}>
    <ExamplePureComponent />
  </AltContainer>

</div>, document.getElementById('main-ui'));