import React, { useState, useEffect } from "react";

const Game = () => {
  const [ gameState, setGameState ] = useState({});

  useEffect(() => {
    setGameState({
      score: 0,
    });
  }, []);

  const loveKukka = () => {
    const newState = { ...gameState };
    newState.score++;
    setGameState(newState);
  };

  return (
    <>
      <h2>Game</h2>
      <p>Score: { gameState.score != null ? gameState.score : "Loading..." }</p>
      <button onClick={ () => loveKukka() }>Rakasta kukkaasi</button>
    </>
  );
};

export default Game;
