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
    <form className="">
      <div className="grid grid-cols-2 gap-y-1 max-w-md my-4 items-center">
        <label htmlFor="username">Käyttäjätunnus: </label>
        <input
          className="border border-gray-400 px-4 py-2 rounded-lg"
          id="username"
          name="username"
          type="text"
          placeholder="niemenkake"
          onChange={ (event) => handleChange(event) }
        />
        <label htmlFor="password">Salasana: </label>
        <input
          className="border border-gray-400 px-4 py-2 rounded-lg"
          id="password"
          name="password"
          type="password"
          onChange={ (event) => handleChange(event) }
        />
      </div>

      <input
        type="submit" 
        value="Pelaamaan!" 
        className="w-full p-4 rounded-lg cursor-pointer" 
        onClick={(event) => preSubmit(event)} 
      />
    </form>
  );
};

export default AuthenticationForm;
