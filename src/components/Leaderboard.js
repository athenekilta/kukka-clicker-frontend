import React from "react";

const Leaderboard = ({ leaderboard = [] })=> {
  return (
    <ul>
      {leaderboard?.map((user, i) => {
        return (
          <li key={user.username}>{i+1}. {user.username}: {user.score}</li>
        );
      })}
    </ul>
  );
};

export default Leaderboard;