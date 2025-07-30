function GameResults({ moves}) {
  return (
    <div className="game-results-modal">
      <h2>Game Over!</h2>
      <p>You made {moves} moves!</p>
    </div>
  );
}

export default GameResults;