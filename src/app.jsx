'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

var square = (b) => {
    return b * b;
};

import {ExampleComponent} from './components/ExampleComponent/ExampleComponent.jsx';

ReactDOM.render(<ExampleComponent fname="Jamaal" />, document.getElementById('main-ui'));