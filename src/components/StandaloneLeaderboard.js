import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { io } from "socket.io-client";
import { baseUrl } from "../services/authService";
import Leaderboard from "./Leaderboard";

const StandloneLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState(null);
  // init game
  useEffect(() => {
    const initGame = () => {
      // init
      const socketClient = io(baseUrl, { 
        // reconnection: false,
      });

      // listeners
      socketClient.on("leaderboard", (users) => {
        setLeaderboard(users);
      });

      // set
      return socketClient;
    };
    const socketClient = initGame();
    return () => {
      if (socketClient) {
        socketClient.disconnect();
      }
    };
  }, []);
  return (
    <div className="w-full max-w-md my-2 md:p-2">
      <Leaderboard leaderboard={leaderboard} />
    </div>
  );
};

export default StandloneLeaderboard;