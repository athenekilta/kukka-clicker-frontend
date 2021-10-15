import React, { useState } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import Game from "./components/Game";
import "./App.scss";

const App = () => {
  const [appState, setAppState] = useState("register");

  const stateComponents = {
    "register": <Register setAppState={setAppState} />,
    "login": <Login setAppState={setAppState} />,
    "game": <Game />,
  };

  return (
    <div>
      <h1>Kukkaclicker</h1>
      {stateComponents[appState]}
    </div>
  );
};

export default App;
