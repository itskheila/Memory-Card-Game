import React, { useState, useEffect } from "react";
import GameCard from "../components/GameCard";
import "../styles/GameBoard.css";

//defines the cards and duplicates them to create pairs
const cardValues = [
  'bananas', 'cherries', 'grapes', 'orangejuice',
  'bananas', 'cherries', 'grapes', 'orangejuice',
  'pear', 'pineapple', 'strawberry', 'watermelon',
  'pear', 'pineapple', 'strawberry', 'watermelon',
];

function GameBoard() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchesFound, setMatchesFound] = useState(0);

  // game starts when the component loads
  useEffect(() => {
    startGame();
  }, []);

  const startGame = () => {
    // Shuffle cards randomly
    const shuffled = [...cardValues].sort(() => Math.random() - 0.5);
    
    // Create card objects
    const newCards = shuffled.map((value, index) => ({
      id: index,
      value: value,
      isFlipped: false,
      isMatched: false,
    }));

    setCards(newCards);
    setFlippedCards([]);
    setMatchesFound(0);
  };

  const handleCardClick = (id) => {
    // will prevent flipping more than 2 cards at once
    if (flippedCards.length >= 2) return;
    
    // cannot flip a card if it's already flipped or matched
    const clickedCard = cards.find(card => card.id === id);
    if (clickedCard.isFlipped || clickedCard.isMatched) return;

    // enables flipping of cards
    setCards(cards.map(card =>
      card.id === id ? { ...card, isFlipped: true } : card
    ));
    
    setFlippedCards([...flippedCards, id]);
  };

  // Checks for matches when 2 cards are flipped
  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstId, secondId] = flippedCards;
      const firstCard = cards.find(card => card.id === firstId);
      const secondCard = cards.find(card => card.id === secondId);

      if (firstCard.value === secondCard.value) {
        // Match found!
        setCards(cards.map(card =>
          (card.id === firstId || card.id === secondId) 
            ? { ...card, isMatched: true } 
            : card
        ));
        setMatchesFound(matchesFound + 1);
        setFlippedCards([]);
      } else {
        // No match - flip cards back after delay
        setTimeout(() => {
          setCards(cards.map(card =>
            (card.id === firstId || card.id === secondId) 
              ? { ...card, isFlipped: false } 
              : card
          ));
          setFlippedCards([]);
        }, 1000); //a time delay of 1 second to show cards then flips back
      }
    }
  }, [flippedCards, cards, matchesFound]);

  // To check if game is won
  useEffect(() => {
    if (matchesFound === 8 && cards.length > 0) {
      setTimeout(() => {
        alert('Congratulations, You Won!');
      }, 500);
    }
  }, [matchesFound, cards]);

  return (
    <div className="game-board-container">
      <h2>Match the Fruits!</h2>
      <div className="game-board-grid">
        {cards.map(card => (
          <GameCard
            key={card.id}
            card={card}
            handleCardClick={handleCardClick}
          />
        ))}
      </div>
      <button onClick={startGame} className="restart-button">Restart Game</button>
    </div>
  );
}

export default GameBoard;