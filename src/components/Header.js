import React from "react";

const Header = ({ user }) => {

  const logout = () => {
    if (window.confirm("Haluatko kirjautua ulos?")) {
      window.localStorage.clear();
      window.location.reload(true);
    }
  };

  return (
    <header
      style={{ background: "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)" }}
      className="w-full pb-16"
    >
      <div className="flex flex-row w-full justify-between items-center p-2 md:p-4">
        <div className="inline-flex items-center">
          <img src="/assets/kukka.png" width="32" height="32" className="w-8 h-8" />
          <h1 className="text-lg font-bold ml-4">Kukan kasvatus peli</h1>
        </div>
        
        <div className="inline-flex items-center">
          { user ? <p className="text-lg font-bold mr-2">{user.username}</p> : null }
          { user ? <a className="pointer-events-auto text-sm" href="#" onClick={() => logout()}>
            <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><path d="M0,0h24v24H0V0z" fill="none"/></g><g><path d="M17,8l-1.41,1.41L17.17,11H9v2h8.17l-1.58,1.58L17,16l4-4L17,8z M5,5h7V3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h7v-2H5V5z"/></g></svg>
          </a> : null }
        </div>
      </div>
    </header>
  );
};

export default Header;