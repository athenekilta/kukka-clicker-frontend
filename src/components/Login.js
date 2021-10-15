import React from "react";
import AuthenticationForm from "./AuthenticationForm";

const Register = ({ setAppState }) => {
  const handleLogin = (event) => {
    setAppState("game");
    event.preventDefault();
  };

  return (
    <>
      <h2>Login</h2>
      <AuthenticationForm handleFormSubmit={handleLogin} />
    </>
  );
};

export default Register;
