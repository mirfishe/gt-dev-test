import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders visit GT link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/visit graston technique website/i);
  expect(linkElement).toBeInTheDocument();
});
