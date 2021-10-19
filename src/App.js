import React, { useCallback, useEffect, useMemo, useState } from "react";
import Auth from "./components/Auth";
import Game from "./components/Game";
import Header from "./components/Header";
import StandloneLeaderboard from "./components/StandaloneLeaderboard";
import Timer from "./components/Timer";
import authService, { baseUrl } from "./services/authService";

const App = () => {
  const [season, setSeason] = useState(null);
  const [view, setView] = useState(null);
  const [user, setUser] = useState(null);

  const seasonHasStarted = useMemo(() => {
    if (!season?.season_start) return false;
    return season.season_start.getTime() <= Date.now();
  }, [season]);

  const seasonHasEnded = useMemo(() => {
    if (!season?.season_end) return false;
    return seasonHasStarted && season.season_end.getTime() <= Date.now();
  }, [season, seasonHasStarted]);

  useEffect(() => {
    const seasonIsOn = !seasonHasEnded && seasonHasStarted;
    if (seasonIsOn)  {
      if (user) {
        setView("game");
      } else {
        setView("login");
      }
    } else if (seasonHasEnded) {
      setView("ended");
    } else if (season && !seasonHasStarted) {
      setView("countdown");
    }
  }, [seasonHasEnded, seasonHasStarted, season, user]);

  const ended = useCallback(() => {
    setSeason({ ...season });
  }, [season]);

  useEffect(() => {
    const fetchSeason =  async() => {
      try {
        // init
        const data = await fetch(`${baseUrl}/api/season`).then((data) => data.json());  
        // set
        if (data?.season_end && data?.season_start) {
          setSeason({
            season_start: new Date(data?.season_start), 
            season_end: new Date(data?.season_end)
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    const fetchUser =  async() => {
      const res = await authService.validate();
      if (res?.data?.user?.username) {
        setUser(res.data.user);
      }
    };
    fetchSeason();
    fetchUser();
  }, []);

  return (
    <div className="overflow-hidden">
      {
        view === "game"
          ? <Game user={user} season_end={season?.season_end} /> : null
      }
      {
        view === "login" ?
          <Auth user={user} setUser={setUser} /> : null
      }
      {
        view === "countdown" ? 
          <>
            <Header user={null} />
            <main className="flex flex-col items-center w-full text-center">
              <div className="max-w-xl my-8 p-2 md:p-4 w-full">
                <h1 className="font-bold text-2xl md:text-4xl">Kasvukausi alkaa!</h1>
                <Timer time={season.season_start} ended={ended} className="block font-bold text-4xl md:text-6xl my-4" />
                <h2 className="font-bold text-xl md:text-2xl mb-2 text-gray-600">
                  Oletko valmis?
                </h2>
                <p className="text-gray-400">
                  Nyt on aika laittaa puutarhahanskat käteen ja virittää klikkaushermot äärimmilleen. Kukan digiloikkaajat tarjoaa syksyyn loputonta kasvua. Kasvukauden menestyjille on luvassa palkintoja!
                </p>
              </div>
            </main>
          </>
          : null 
      }
      {
        view === "ended" ? 
          <>
            <Header user={null} />
            <main className="flex flex-col items-center w-full text-center">
              <div className="max-w-md my-8 p-2 md:p-4 w-full">
                <h1 className="font-bold text-4xl">Kiitos kasvattajille!</h1>
                <p className="mt-4">
                  Alla ensimmäisen kasvukauden tulokset. Onnea voittajille!
                </p>
                <StandloneLeaderboard />
              </div>
            </main>
          </>
          : null 
      }
    </div>
  );
};

export default App;
