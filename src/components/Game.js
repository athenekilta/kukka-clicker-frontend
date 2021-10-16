import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import Leaderboard from "./Leaderboard";
import { getToken } from "../services/authService";
import UpgradeRewardProgress from "./UpgradeRewardProgress";
import KukkaDisplay from "./KukkaDisplay";
import Score from "./Score";

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
        // reconnection: false,
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
    const interval = setInterval(() => {
      if (socketClient && socketClient.connected) {
        socketClient.emit("heartbeat");
      }
    }, 2000);
    return () => {
      if (socketClient) {
        socketClient.disconnect();
      }
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [user]);

  return (
    <div className="md:grid grid-cols-2">
      
      <div>  
        {gameState ?
          <KukkaDisplay score={score} user={user} clickKukka={clickKukka} />
          : null}
      </div>

      <div className="md:h-screen overflow-y-auto">
        <Leaderboard leaderboard={leaderboard} />
        {/* Upgrades listed here */}
        {upgrades ? 
          <>
            <div className="p-2">
              <h1 className="text-lg font-bold">Päivitykset</h1>
              <p className="text-xs italic"> Päivitykset kasvattat kukkaa puolestasi. Osta tai paranna päivityksiä klikkaamalla niitä!</p>
            </div>
            <ul>{upgrades
              .filter((upgrade) => {
                const alkurString = "Alkuräjähdys 2.0";
                const allUnlocked = !gameState ? false : gameState
                  .upgrades
                  .map(u => u.type)
                  .includes(alkurString);
                const alkur = upgrades.find(u => u.type === alkurString);
                const isEarlyGame = upgrades
                  .filter(u => u.cost <= alkur.cost)
                  .map(u => u.type)
                  .includes(upgrade.type);
                return allUnlocked || isEarlyGame;
              })
              .map((upgrade) => {
                const usersUpgrade = gameState?.upgrades.find((up) => up.type === upgrade.type);
                const profit = usersUpgrade ? upgrade.score + upgrade.score * Math.pow(upgrade.ratio, usersUpgrade.level) : upgrade.score;
                const cost = usersUpgrade ? upgrade.cost * Math.pow(2, usersUpgrade.level) : upgrade.cost;
                const isClickable = score >= cost;
                const onClick = () => clickUpgrade(upgrade.type);

                return (
                  <li
                    key={upgrade.type}
                    className={`relative p-2 md:p-4 ${isClickable ? "hover:bg-blue-200 cursor-pointer" : "opacity-50 cursor-not-allowed"}`}
                    onClick={isClickable ? onClick : undefined}
                  >
                    <UpgradeRewardProgress score={score} cost={cost} upgrade={usersUpgrade} upgradeDefinition={upgrade} />

                    <div className="flex flex-col md:flex-row justify-between md:items-center">
                      <p className="font-bold text-lg">{upgrade.type}</p>
                      <p className="text-xs italic">{upgrade.description}</p>
                      <span className="whitespace-nowrap font-bold">lvl {usersUpgrade?.level || 0}</span>
                    </div>

                    <p>tuottaa
                      <b> <Score value={profit}/> </b>
                      joka <b>{upgrade.time_interval / 1000}. sekunti</b>
                      <em> (<Score value={profit/upgrade.time_interval*1000} />/sekunti)</em>
                    </p>               
                    <span className="text-xs italic">
                      {usersUpgrade
                        ? "päivityksen hinta"
                        : "hinta"
                      }: <Score value={cost} />
                    </span>
                  </li>
                );
              })}
            </ul>
          </>
          : null}

        <div className="footer p-6 w-full">
          <p className="text-center text-gray-300">Copyright 2021, Kukan digiloikkaajat – Oliver, Sampo & Joel</p>
          <p className="text-center text-gray-300">Tehty kukkaviikonlopun aikana ilman ulkopuolista rahoitusta</p>
          <p className="text-center text-gray-300"><a href="https://kukka.digital" target="_blank" rel="noreferrer" className="underline">kukka.digital</a></p>
        </div>
      </div>
    </div>
  );
};

export default Game;
