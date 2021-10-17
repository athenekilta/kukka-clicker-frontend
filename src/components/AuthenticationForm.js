import React, { useState } from "react";

const AuthenticationForm = ({ handleCredentials }) => {
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");
  
  const handleChange = (event) => {
    const f = {
      username: setUsername,
      password: setPassword,
    };
    f[event.target.name](event.target.value);
  };

  const preSubmit = (event) => {
    event.preventDefault();
    handleCredentials(username, password);
  };

  return (
    <form className="grid grid-cols-2 gap-y-1 max-w-md">
      <label htmlFor="username">Käyttäjätunnus: </label>
      <input
        className="border border-gray-400"
        id="username"
        name="username"
        type="text"
        placeholder="niemenkake"
        onChange={ (event) => handleChange(event) }
      />
      <label htmlFor="password">Salasana: </label>
      <input
        className="border border-gray-400"
        id="password"
        name="password"
        type="password"
        onChange={ (event) => handleChange(event) }
      />
      <input type="submit" value="Pelaamaan!" onClick={(event) => preSubmit(event)} />
    </form>
  );
};

export default AuthenticationForm;
