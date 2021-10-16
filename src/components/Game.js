import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import GameQuote from "./GameQuote";
import Leaderboard from "./Leaderboard";
import { getToken } from "../services/authService";

/**
 * The main game component
 */
const Game = ({ user }) => {
  const [client, setClient] = useState(null);
  const [leaderboard, setLeaderboard] = useState(null);
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
    client.emit("upgrade", { type });
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
      if (!user) return;
      // init
      const token = getToken();
      const socketClient = io(SERVER_URL, { 
        transportOptions: {
          polling: {
            extraHeaders: {
              ...(token ? {Authorization: `Bearer ${token}`} : {})
            },
          },
        },
        reconnection: false,
      });

      // listeners
      socketClient.on("set_state", (state) => {
        setGameState(state);
      });
      socketClient.on("leaderboard", (users) => {
        setLeaderboard(users);
      });

      // set
      setClient(socketClient);
      return socketClient;
    };
    const socketClient = initGame();
    return () => {
      if (socketClient) {
        socketClient.emit("disconnect");
      }
    };
  }, [user]);

  return (
    <>
      <h2>Kukan kasvatus peli</h2>

      <Leaderboard leaderboard={leaderboard} />

      {gameState ? 
        <>     
          <h1>Kukkasi on: { gameState.score != null ? gameState.score : "Loading..." } metriä pitkä</h1>
          <GameQuote score={score} />
          <button onClick={ clickKukka }>Rakasta kukkaasi</button>
        </>
        : null}

      {/* Upgrades listed here */}
      {upgrades ? 
        <>
          <ul>{upgrades.map((upgrade) => {
            const usersUpgrade = gameState?.upgrades.find((up) => up.type === upgrade.type);
            const cost = usersUpgrade ? upgrade.cost * Math.pow(2, usersUpgrade.level) : upgrade.cost;
            const isClickable = score >= cost;
            const onClick = () => clickUpgrade(upgrade.type);
            return (
              <li
                key={upgrade.type}
                className={`p-2 md:p-4 ${isClickable ? "hover:bg-gray-400 cursor-pointer" : "opacity-50"}`}
                onClick={isClickable ? onClick : undefined}
              >
                <div className="flex justify-between">
                  <p>{upgrade.type}</p>
                  <p className="text-xs italic">{upgrade.description}</p>
                  <span>lvl {usersUpgrade?.level || 0}</span>
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
