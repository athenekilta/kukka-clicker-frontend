import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

/**
 * The main game component
 */
const Game = () => {
  const [client, setClient] = useState(null);
  const [upgrades, setUpgrades] = useState(null);
  const [gameState, setGameState] = useState(null);

  const score = useMemo(() => {
    return gameState?.score || 0;
  }, [gameState]);

  const SERVER_URL  = "http://localhost:4000";

  const clickKukka = () => {
    if (!client) return; 
    client.emit("click");
  };

  const clickUpgrade = (type) => {
    if (!client) return; 
    client.emit(type);
  };

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
        <>      <p>Kukkasi on: { gameState.score != null ? gameState.score : "Loading..." } metriä pitkä</p>
          <button onClick={ clickKukka }>Rakasta kukkaasi</button></>
        : null}

      {/* Upgrades listed here */}
      {upgrades ? 
        <>
          <ul>{upgrades.map((upgrade) => {
            const usersUpgrade = gameState?.upgrades.find((up) => up.type === upgrade.type);
            const cost = usersUpgrade ? usersUpgrade.cost * Math.pow(2, usersUpgrade.level) : upgrade.cost;
            const isClickable = score >= cost;
            return (
              <li
                key={upgrade.type}
                className={`p-2 md:p-4 ${isClickable ? "hover:bg-gray-400 cursor-pointer" : "opacity-50"}`}
                onClick={isClickable ? () => clickUpgrade(upgrade.type) : undefined}
              >
                <div className="flex justify-between">
                  <p>{upgrade.type}</p>
                  <span>lvl 0</span>
                </div>
                
                <span>hinta: {cost} metriä</span>
              </li>
            );
          })}
          </ul>
        </> : null}
    </>
  );
};

export default Game;
