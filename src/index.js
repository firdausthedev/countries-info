import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createLogger } from 'redux-logger';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { searchCountries } from './reducers';

const logger = createLogger();
const store = createStore(searchCountries, applyMiddleware(logger));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
