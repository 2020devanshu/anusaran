import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [close, setClose] = useState(false);
  const navigate = useNavigate()


  useEffect(() => {
    console.log("close", close);
  }, [close]);

  function handleClose() {
    setClose(true);
  }

  function handleOpen() {
    setClose(!close);
  }
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");

    navigate("/");
    window.location.reload(true);
  };

  return (
    <AppContext.Provider value={{ close, handleClose, handleOpen, handleLogout }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
