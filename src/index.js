import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createLogger } from 'redux-logger';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleWare from 'redux-thunk';
import { searchCountries, requestCountries, changePageNumber } from './reducers';

const logger = createLogger();
const rootReducer = combineReducers({ searchCountries, requestCountries, changePageNumber });
const store = createStore(rootReducer, applyMiddleware(thunkMiddleWare, logger));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
