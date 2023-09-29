import React, { createContext, useContext } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {

  const navigate = useNavigate();
  const login = (loggedIn, Admin, email) => {

    Cookies.set("isLoggedIn", loggedIn);
    Cookies.set("isAdmin", Admin);
    Cookies.set("email", email);
    //console.log(loggedIn, Admin);
    //window.location.reload();
  };

  const logout = () => {
    Cookies.remove("isLoggedIn");
    Cookies.remove("isAdmin");
    Cookies.remove("email");
    navigate("/");
    //window.location.reload();
  };

  return (
    <UserContext.Provider value={{login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
