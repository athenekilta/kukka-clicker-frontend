import React from "react";

const Leaderboard = ({ leaderboard = [] })=> {
  return (
    <article className="my-2">
      <h1 className="text-lg">Isoimmat kasvattajat</h1>
      <ul>
        {leaderboard?.map((user, i) => {
          const medal = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : null;
          return (
            <li
              key={user.username}
              className="p-2"
            >{i+1}. <b>{medal} {user.username}</b>: {user.score}</li>
          );
        })}
      </ul>
    </article>
  );
};

export default Leaderboard;