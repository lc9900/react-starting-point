// import React from 'react';
// import ReactDOM from 'react-dom';
// import Main from './components/Main';
// import { BrowserRouter as Router} from 'react-router-dom';

// ReactDOM.render(
//     <Router>
//         <Main />
//     </Router>, document.getElementById('root'));


'use strict'
import React from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux'

import store from './store'
// import Root from './components/Root'
import Main from './components/Main';
import { BrowserRouter as Router} from 'react-router-dom';


render (
  <Provider store={store}>
    <Router>
        <Main />
    </Router>
  </Provider>,
  document.getElementById('root')
)
