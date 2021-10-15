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
    <form>
      <label htmlFor="username">Username: </label>
      <input
        id="username"
        name="username"
        type="text"
        placeholder="niemenkake"
        onChange={ (event) => handleChange(event) }
      />
      <br />
      <label htmlFor="password">Password: </label>
      <input
        id="password"
        name="password"
        type="password"
        onChange={ (event) => handleChange(event) }
      />
      <br />
      <input type="submit" value="Register" onClick={(event) => preSubmit(event)} />
    </form>
  );
};

export default AuthenticationForm;
