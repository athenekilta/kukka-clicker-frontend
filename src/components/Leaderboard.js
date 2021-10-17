import React from "react";
import Score from "./Score";

const Leaderboard = ({ leaderboard = [] })=> {
  return (
    <article className="p-2">
      <h1 className="text-lg font-bold">Isoimmat kasvattajat</h1>
      <ul>
        {leaderboard?.map((user, i) => {
          const medal = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : null;
          return (
            <li
              key={user.username}
              className="p-2"
            >{medal ? medal : i+1 + "."} <b>{user.username}</b>: <Score value={user.score} /> <em>(taso {user.level})</em></li>
          );
        })}
      </ul>
    </article>
  );
};

export default Leaderboard;
