import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from "redux";
import { Provider } from 'react-redux';
import { rootReducer } from './redux/reducer/rootReducer';


import "./index.css"
import App from './App';

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
    
  </React.StrictMode>,
  document.getElementById('root')
);


