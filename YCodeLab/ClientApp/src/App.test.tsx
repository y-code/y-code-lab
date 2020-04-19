import * as React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { render, cleanup } from '@testing-library/react';

describe('App', () => {
  beforeEach(() => {
    cleanup();
  });

  it('renders without crashing', () => {
      const storeFake = (state: any) => ({
          default: () => {},
          subscribe: () => {},
          dispatch: () => {},
          getState: () => ({ ...state })
      });
      const store = storeFake({}) as any;

      render(
          <Provider store={store}>
              <MemoryRouter>
                  <App/>
              </MemoryRouter>
          </Provider>);
  });
});
