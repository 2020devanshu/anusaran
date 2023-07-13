import React, { createContext, useState, useContext, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [close, setClose] = useState(false);

  useEffect(() => {
    console.log("close", close);
  }, [close]);

  function handleClose() {
    setClose(true);
  }

  function handleOpen() {
    setClose(!close);
  }

  return (
    <AppContext.Provider value={{ close, handleClose, handleOpen }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
