import React from "react";
import AuthenticationForm from "./AuthenticationForm";
import authService from "../services/authService";

const Register = ({ setUser }) => {
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
      <h2>Kirjaudu sisään tai rekisteröidy</h2>
      <p>
        Jos sinulla on jo tunnukset, syötä ne tähän.
        Voit myös rekisteröityä syöttämällä tunnukset samaan kenttään.
      </p>
      <AuthenticationForm
        handleCredentials={handleRegister}
      />
      <a href="#" onClick={ () =>
        alert("Mietipä vielä uudestaan! Jos et keksi, niin tee uusi tunnus.")
      }>
        Unohditko salasanasi?
      </a>
    </>
  );
};

export default Register;
