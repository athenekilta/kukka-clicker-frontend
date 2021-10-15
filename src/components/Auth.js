import React from "react";
import AuthenticationForm from "./AuthenticationForm";
import authService from "../services/authService";

const Register = ({ setUserData }) => {
  const handleRegister = async (user, pass) => {
    const result = await authService.login(
      user,
      pass,
    );
    if (result && result.status === 200)
      setUserData(result.data.user);
    else if (result && result.data.message === "no user with that username") {
      const registerResult = await authService.register(
        user,
        pass,
      );
      if (registerResult && registerResult.status === 201)
        setUserData(result.data.user);
    } else if (result) {
      alert(result.data.message);
    }  
  };

  return (
    <>
      <h2>Log in or register</h2>
      <AuthenticationForm
        handleCredentials={handleRegister}
      />
    </>
  );
};

export default Register;
