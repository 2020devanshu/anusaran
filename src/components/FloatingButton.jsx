import React from "react";

const FloatingButton = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-4 right-4 bg-purple-500 text-white px-4 py-2 rounded-full"
    >
      {children}
    </button>
  );
};

export default FloatingButton;
