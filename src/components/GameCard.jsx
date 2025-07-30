import React from "react";
import "../styles/GameCard.css";

//importing the card images
import bananas from "../assets/bananas.png";
import cherries from "../assets/cherries.png";
import grapes from "../assets/grapes.png";
import orangejuice from "../assets/orange-juice.png";
import pear from "../assets/pear.png";
import pineapple from "../assets/pineapple.png";
import strawberry from "../assets/strawberry.png";
import watermelon from "../assets/watermelon.png";

const fruitImgs={
    'bananas': bananas,
    'cherries': cherries,
    'grapes': grapes,
    'orangejuice': orangejuice,
    'pear': pear,
    'pineapple': pineapple,
    'strawberry': strawberry,
    'watermelon': watermelon
    
};



function GameCard({ card, handleCardClick }) {
    //only allow clicks if the card is not matched and not flipped
  const handleClick = () => {
    
    if (!card.isMatched && !card.isFlipped) {
      handleCardClick(card.id);
    }
  };

  return (
    <div
      className={`game-card ${card.isFlipped ? 'flipped' : ''} ${card.isMatched ? 'matched' : ''}`}
      onClick={handleClick}
    >
      <div className="game-card-inner">
        <div className="game-card-front"></div> 
        <div className="game-card-back">
        {/* Displays the image based on the card value */}
        <img src={fruitImgs[card.value]} alt={card.value} />
        </div>
      </div>
    </div>
  );
}

export default GameCard;

