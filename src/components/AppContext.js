import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [close, setClose] = useState(false);
  const navigate = useNavigate()

  const notify = () => toast("Success");

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
    <AppContext.Provider value={{ close, handleClose, handleOpen, handleLogout, notify }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
