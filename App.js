import React from 'react';
import { useState } from 'react';





function Square({ value, sindex, winningLine, onSquareClick }) {
  const win = winningLine && winningLine.includes(sindex);
  
  const changeWin = win ? 'winner' : console.log('Next Move');
  console.log(sindex, winningLine, win);
  
  return (
    <button className={'square ' + changeWin} onClick={onSquareClick}>
      {value}
    </button>
  )
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }
  
  const winningLine = calculateWinner(squares);
  let status;
  if (winningLine) {
    const winner = squares[winningLine[0]];
    status = 'Winner: ' + winner;
    
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} sindex = {0} winningLine = {winningLine} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} sindex = {1} winningLine = {winningLine} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} sindex = {2} winningLine = {winningLine} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} sindex = {3} winningLine = {winningLine} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} sindex = {4} winningLine = {winningLine} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} sindex = {5} winningLine = {winningLine} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} sindex = {6} winningLine = {winningLine} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} sindex = {7} winningLine = {winningLine} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} sindex = {8} winningLine = {winningLine} onSquareClick={() => handleClick(8)} />
      </div>
    </div>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
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

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if ( squares[a] && (squares[a] === squares[b]) && (squares[a] === squares[c]) ) {
      return lines[i];
      
    }
  }
  return null;
}