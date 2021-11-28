import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app header', () => {
  render(<App />);
  const header = screen.getByText(/To-Do Manager/i);
  expect(header).toBeInTheDocument();
});

test('renders add button', () => {
  render(<App />);
  const addToDoButton = screen.getByText(/Add To-Do/i);
  expect(addToDoButton).toBeTruthy()
});

test('renders active items header', () => {
  render(<App />);
  const activeItemsHeader = screen.getByText(/Active To-Do Items/i);
  expect(activeItemsHeader).toBeInTheDocument();
});

test('renders completed items header', () => {
  render(<App />);
  const completedItemsHeader = screen.getByText(/Completed To-Do Items/i);
  expect(completedItemsHeader).toBeInTheDocument();
});
