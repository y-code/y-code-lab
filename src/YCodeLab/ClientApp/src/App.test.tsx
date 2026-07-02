import * as React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { render, cleanup } from '@testing-library/react';
import configureTestStore from './store/configureTestStore';

describe('App', () => {
  beforeEach(() => {
    cleanup();
  });

  it('renders without crashing', () => {
    const { testStore, stethoscope } = configureTestStore();

    render(
      <Provider store={testStore}>
        <MemoryRouter>
          <App/>
        </MemoryRouter>
      </Provider>);
  });
});
