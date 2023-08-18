import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from "./context/AuthContext/AuthState"; // Update the path accordingly

const ProtectedRoute = ({ path, element }) => {
  const { Auth } = useContext(AuthContext); // Update with the appropriate context variable

  return Auth ? <Route path={path} element={element} /> : <Navigate to="/unAuthenticated" />;
};

export default ProtectedRoute;
