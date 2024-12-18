import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { Provider as StoreProvider } from 'react-redux';

import App from './app/app';
import { store } from '@ycode-lab/common';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  </StrictMode>
);
