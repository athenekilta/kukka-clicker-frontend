import React from "react";
import AuthenticationForm from "./AuthenticationForm";

const Register = ({ setAppState }) => {
  const handleRegister = (event) => {
    setAppState("login");
    event.preventDefault();
  };

  return (
    <>
      <h2>Register</h2>
      <AuthenticationForm handleFormSubmit={handleRegister} />
    </>
  );
};

export default Register;
