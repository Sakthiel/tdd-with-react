import { useState } from 'react';
import Board from "./Board.js";


export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = (currentMove % 2 === 0);
  const currentSquares = history[currentMove];

  function handlePlay(squares) {
    const nextHistory = [...history.slice(0, currentMove + 1), squares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }
  function toJump(move) {
    setCurrentMove(move);

  }
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0)
      description = "Go to move " + move;
    else
      description = "Go to start of game";
    return (
      <li key={move}>
        <button data-testid="moveButton" onClick={() => toJump(move)}>
          {description}
        </button>
      </li>
    );
  });
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
