import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './store/main';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const linkElement = screen.getByText(/Crypto Order Book/i);
  expect(linkElement).toBeInTheDocument();
});
