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
    <main className="overflow-hidden">
      {
        user
          ? <Game user={user} />
          : <Auth setUser={setUser} />
      }
    </main>
  );
};

export default App;
