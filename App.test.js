import { render, screen,fireEvent } from '@testing-library/react';
import App from './App';
import Square from './Square';
import Game from './App';
import Board from './Board';
test('should render a button with Go to start', () => {

  const Hello = render(<App />);
  expect(Hello.getByTestId("moveButton")).toHaveTextContent("Go");
});

test('renders a button', () => {

  const Hello = render(<Square />);
  expect(Hello.getByTestId("square")).not.toBeNull;
});

describe('Game', () => {
  it('renders without errors', () => {
    render(<Game />);
  });

it('allows X and O to take turns', () => {
    const { getAllByRole } = render(<Game />);
    const squares = getAllByRole('button');

    fireEvent.click(squares[0]); // X's turn
    expect(squares[0].textContent).toBe('X');

    fireEvent.click(squares[1]); // O's turn
    expect(squares[1].textContent).toBe('O');

    fireEvent.click(squares[2]); // X's turn
    expect(squares[2].textContent).toBe('X');
  });}
);

