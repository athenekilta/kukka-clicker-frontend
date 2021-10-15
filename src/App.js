import React, { useState } from "react";
import Auth from "./components/Auth";
import Game from "./components/Game";
import "./App.scss";

const App = () => {
  const [userData, setUserData] = useState(null);

  return (
    <div>
      <h1>Kukkaclicker</h1>
      {
        userData
          ? <Game userData={userData} />
          : <Auth setUserData={setUserData} />
      }
      <p>{ userData ? `Logged in as ${userData.username}` : "Not logged in" }</p>
    </div>
  );
};

export default App;
