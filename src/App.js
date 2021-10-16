import React, { useEffect, useState } from "react";
import Auth from "./components/Auth";
import Game from "./components/Game";
import authService from "./services/authService";
import "./App.scss";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser =  async() => {
      const res = await authService.validate();
      if (res?.data?.user?.username) {
        setUser(res.data.user);
      }
    };
    fetchUser();
  }, []);

  return (
    <div>
      <h1>Kukkaclicker</h1>
      {
        user
          ? <Game user={user} />
          : <Auth setUser={setUser} />
      }
      <p>{ user ? `Kirjautunut pelaaja: ${user.username}` : null }</p>
    </div>
  );
};

export default App;
