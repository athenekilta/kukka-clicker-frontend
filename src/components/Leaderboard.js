import React, { useState } from "react";
import Score from "./Score";

const Leaderboard = ({ leaderboard })=> {
  const [active, setActive] = useState("biggest");
  return (
    <article className="p-2 w-full">
      <h1 className="text-xl font-bold my-2 mb-1 pt-px w-full">Top 10: Isoimmat kasvattajat</h1>
      <nav className="grid grid-cols-3 w-full mb-1">
        {
          ["biggest", "level", "clicks"].map((type) => {
            const isActive = active === type;
            const name = type === "biggest" ? "isoin" : type === "level" ? "tasokkain" : "klikkaukset";
            return (
              <div
                key={type}
                onClick={() => setActive(type)}
                className={`cursor-pointer md:hover:bg-gray-200 px-2 py-1 ${isActive ? "font-bold border-b border-gray-400" : ""}`}
              >
                <p className={"text-center"}>
                  {name}
                </p>
              </div>
            );
          })
        }
      </nav>
      <ul>
        {leaderboard?.[active]?.map((user, i) => {
          const medal = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : null;
          return (
            <li
              key={user.username}
              className="p-2"
            >{medal ? medal : i+1 + "."} <b>{user.username}</b>:{" "}
              {active === "biggest" ? <Score value={user.score}/> : null}
              {active === "level" ? <span>taso {user.level}</span> : null}
              {active === "clicks" ? <span>{user.clicks} klikkausta</span> : null}
            </li>
          );
        })}
      </ul>
    </article>
  );
};

export default Leaderboard;
