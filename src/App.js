import React, { useEffect, useState } from "react";
import Auth from "./components/Auth";
import Game from "./components/Game";
import authService from "./services/authService";
import "./App.scss";

const App = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUser =  async() => {
      const res = await authService.validate();
      if (res.data?.user?.username) {
        setUserData(res.data.user);
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
      <p>{ userData ? `Kirjautunut pelaaja: ${userData.username}` : "" }</p>
    </div>
  );
};

export default App;
