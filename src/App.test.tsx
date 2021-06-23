import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './store/main';
import App from './App';

test('Application can render correctly', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const linkElement = screen.getByText(/Active currency:/i);
  expect(linkElement).toBeInTheDocument();
});