import React, { useState } from "react";
import { Route, Redit } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Route
      path="/protected"
      render={(props) => {
        if (!isAuthenticated) {
          return <Redirect to="/ />;
        }

        return children;
      }}
    />
  );
};

export default ProtectedRoute;
