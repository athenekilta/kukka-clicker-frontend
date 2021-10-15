import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

/**
 * The main game component
 */
const Game = () => {
  const [client, setClient] = useState(null);
  const [upgrades, setUpgrades] = useState(null);
  const [gameState, setGameState] = useState(null);

  const SERVER_URL  = "http://localhost:4000";

  // init upgrades
  useEffect(() => {
    const getUpgrades = async () => {
      try {
      // init
        const data = await fetch(`${SERVER_URL}/api/upgrades`).then((data) => data.json());  
        // set
        setUpgrades(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUpgrades();
  }, []);

  // init game
  useEffect(() => {
    const initGame = () => {
      // init
      const socketClient = io(SERVER_URL, { withCredentials: true });

      // listeners
      socketClient.on("set_state", (state) => {
        setGameState(state);
      });

      // set
      setClient(socketClient);
    };
    initGame();
  }, []);

  return (
    <>
      <h2>Kukan kasvatus peli</h2>
      {gameState ? 
        <>      <p>Score: { gameState.score != null ? gameState.score : "Loading..." }</p>
          <button onClick={ () => client.emit("click") }>Rakasta kukkaasi</button></>
        : null}

      {/* Upgrades listed here */}
      {upgrades ? 
        <>
          <ul>{upgrades.map((upgrade) => {
            return (
              <li key={upgrade.type} className="p-2 md:p-4 hover:bg-gray-400 cursor-pointer">
                <div className="flex justify-between">
                  <p>{upgrade.type}</p>
                  <span>lvl 0</span>
                </div>
                
                <span>hinta: {upgrade.cost}</span>
              </li>
            );
          })}
          </ul>
        </> : null}
    </>
  );
};

export default Game;
