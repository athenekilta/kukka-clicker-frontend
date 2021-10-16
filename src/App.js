import React, { useEffect, useState } from "react";
import Auth from "./components/Auth";
import Game from "./components/Game";
import authService from "./services/authService";
import "./App.scss";

const App = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUser =  async() => {
      const user = await authService.validate();
      if (user) {
        setUserData(user);
      }
    };
    fetchUser();
  }, []);

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
