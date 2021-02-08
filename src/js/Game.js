import React, { useEffect, useState } from 'react';
import { v1 as uuidv1 } from 'uuid';
import Square from './Square';
import imageImports from './imageImports';


function shuffleArray(array){
  return array.sort( () => .5 - Math.random());
}

function generateSquares() {
  const squares = shuffleArray(imageImports)
  .slice(0) //creates shallow copy
  .map(url => ({
    id: uuidv1(),
    imageUrl: url,
    isFlipped: false,
    toggleFlip: true
  }));
  return JSON.parse(JSON.stringify(squares));
}

export default function Game() {
  
  const [squares, setSquares] = useState(generateSquares());
  const [toggleFlip, setToggleFlip] = useState(false);
  const [square1, setSquare1] = useState(null);
  const [square2, setSquare2] = useState(null);

  function setSquareIsFlipped(squareID, isFlipped) {
    setSquares(prev => prev.map(sq => {
      if (sq.id !== squareID)
        return sq;
      return {...sq, isFlipped};
    }));
  }

  function setSquareToggleFlip(squareID, toggleFlip) {
    setSquares(prev => prev.map(sq => {
      if (sq.id !== squareID)
        return sq;
      return {...sq, toggleFlip};
    }));
  }

  //showcase
  useEffect(() => {
    setTimeout(() => {
      let index = 0;
      for (const square of squares) {
        setTimeout(() => setSquareIsFlipped(square.id, true), index++ * 100);
      }
      setTimeout(() => setToggleFlip(true), squares.length * 100);
    }, 1000);
  }, []);


  function resetBothCards() {
    setSquare1(null);
    setSquare2(null);
  }

  function onMatch() {
    setSquareToggleFlip(square1.id, false);
    setSquareToggleFlip(square2.id, false);
    setSquareIsFlipped(square1.id, false);
    setSquareIsFlipped(square2.id, false);
    resetBothCards();
  }

  function onFail() {
    const square1ID = square1.id;
    const square2ID = square2.id;

    setTimeout(() => {
      setSquareIsFlipped(square1ID, true);
    }, 1000);
    setTimeout(() => {
      setSquareIsFlipped(square2ID, true);
    }, 1200);
      
    resetBothCards();
  }
    
  useEffect(() => {
    if (!square1 || !square2)
      return;
    (square1.imageUrl === square2.imageUrl) ? onMatch() : onFail();
  }, [square1, square2]);

  function onSquareClick(square) {
    if (!toggleFlip)
      return;
    if (!square.toggleFlip)
      return;
    
    if ((square1 && (square.id === square1.id) || (square2 && (square.id === square2.id))))
      return;

    setSquareIsFlipped(square.id, false);

    (square1) ? setSquare2(square) : setSquare1(square);
  }

  return(
    <div className="game-container">
      <div className="squares-container">
        {squares.map((square) => (
          <Square onClick={() => onSquareClick(square)} key={square.id} {...square}/>
      ))}
      </div>
    </div>
  );
}

