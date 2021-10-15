import React from "react";

const AuthenticationForm = ({ handleFormSubmit }) => {
  return (
    <form>
      <label htmlFor="username">Username: </label>
      <input id="username" name="username" type="text" placeholder="niemenkake" />
      <br />
      <label htmlFor="password">Password: </label>
      <input id="password" name="password" type="password" />
      <br />
      <input type="submit" value="Register" onClick={(event) => handleFormSubmit(event)} />
    </form>
  );
};

export default AuthenticationForm;
