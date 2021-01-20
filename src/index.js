import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';
import { createStore , combineReducers , applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import todosReducer from './store/reducers/todos';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Material Ui 
// Comments On Code 
// Best Practices [ leaner Switch Cases ]

// Authentication.
// Don't  Add Existing Todos .



const rootReducer = combineReducers( {
  td: todosReducer
} );

const logger = store => {
  return next => {
      return action => {
          //console.log('[Middleware] Dispatching', action);
          const result = next(action);
          //console.log('[Middleware] next state', store.getState());
          return result;
      }
  }
};

const composeEnhancers =   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__  || compose;

const store = createStore( rootReducer , composeEnhancers( applyMiddleware( logger, thunk ) ) );

const app = (
  <Provider store={store}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
  </Provider>
  )

ReactDOM.render(app, document.getElementById('root')

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
