import './bootstrap.css';
import './bootstrap.scss';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import App from './App';
import * as serviceWorker from './registerServiceWorker';

// Get the application-wide store instance, prepopulating with state from the server where available.
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root'));

serviceWorker.unregister();
