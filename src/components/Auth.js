import React from "react";
import AuthenticationForm from "./AuthenticationForm";
import authService from "../services/authService";
import StandloneLeaderboard from "./StandaloneLeaderboard";
import Header from "./Header";

const Register = ({ user, setUser }) => {
  const handleRegister = async (user, pass) => {
    let result = await authService.login(
      user,
      pass,
    );
    if (result && result.status === 200)
      setUser(result.data.user);
    else if (result && result.data.message === "no user with that username") {
      result = await authService.register(
        user,
        pass,
      );
      if (result && result.status === 201)
        setUser(result.data.user);
    } else if (result) {
      alert(result.data.message);
    } else {
      alert("No result from server, please contact administrators");
    }
  };

  return (
    <>
      <Header user={user} />
      <main className="flex flex-col items-center w-full">
        <div className="max-w-md my-8 p-2 md:p-4 w-full">
          <h1 className="font-bold text-2xl">Kirjaudu sisään tai rekisteröidy</h1>
          <p className="">
        Jos sinulla on jo tunnukset, syötä ne tähän.
        Voit myös rekisteröityä syöttämällä tunnukset samaan kenttään.
          </p>
          <AuthenticationForm
            handleCredentials={handleRegister}
          />
          <a
            className="text-sm text-gray-400 underline"
            href="#" 
            onClick={ () =>
              alert("Mietipä vielä uudestaan! Jos et keksi, niin tee uusi tunnus.")
            }>
          Unohditko salasanasi?
          </a>
        </div>

        <StandloneLeaderboard />
      </main>
    </>
  );
};

export default Register;
