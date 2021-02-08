import React from 'react';
import FrontSide from './FrontSide';
import BackSide from './BackSide';
import ReactCardFlip from 'react-card-flip';

export default function Square({ imageUrl, isFlipped, onClick}) {
  return(
    <div className="square-container" onClick={onClick}>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <FrontSide src={imageUrl} className="image-container"/>
        <BackSide />
      </ReactCardFlip>
    </div>
  );
}
