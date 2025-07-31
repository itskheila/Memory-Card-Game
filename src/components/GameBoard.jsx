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
  const [moves, setMoves] = useState(0); // Track moves

  // game starts when the component loads
  useEffect(() => {
    startGame();
  }, []);

  const startGame = () => {
    // enables shuffling of cards and creates an array of shuffled card values
    const shuffled = [...cardValues].sort(() => Math.random() - 0.5);
    
    // helps create card objects with id, value, isFlipped, and isMatched properties
    
    const newCards = shuffled.map((value, index) => ({
      id: index,
      value: value,
      isFlipped: false,
      isMatched: false,
    }));

    setCards(newCards);
    setFlippedCards([]);
    setMatchesFound(0);
    setMoves(0); // Resets moves to 0
  };

  const handleCardClick = (id) => {
    // will prevent flipping more than 2 cards at once
    if (flippedCards.length >= 2) return;
    
    // cannot flip a card if it's already flipped or matched
    const clickedCard = cards.find(card => card.id === id);
    if (clickedCard.isFlipped || clickedCard.isMatched) return;
    
    // Increments the move counter
    setMoves(moves + 1);
    
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
        // Match found
        setCards(cards.map(card =>
          (card.id === firstId || card.id === secondId) 
            ? { ...card, isMatched: true } 
            : card
        ));
        setMatchesFound(matchesFound + 1);
        setFlippedCards([]);
      } else {
        // if no match is found, cards will be flipped back after a delay
        setTimeout(() => {
          setCards(cards.map(card =>
            (card.id === firstId || card.id === secondId) 
              ? { ...card, isFlipped: false } 
              : card
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards, cards, matchesFound]);

  // Helps check if the game has been won
  useEffect(() => {
    if (matchesFound === 8) {
      setTimeout(() => {
        alert(`Congratulations! You won in ${moves} moves!`);
      }, 500);
    }
  }, [matchesFound, cards, moves]);

  return (
    <div className="game-board-container">
      <h2>Match the Fruits!</h2>
      
      {/* Display moves counter */}
      <div className="game-stats">
        <div>Moves: {moves}</div>
      </div>
      
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