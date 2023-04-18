import React, { Fragment } from 'react';
import { redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({ isAdmin, isAuthenticated, component: Component }) => {
  return (
    <Route
      element={(props) => {
        if (isAuthenticated === false) {
          return <redirect to="/login" />;
        }
        if (isAdmin === false) {
          return <redirect to="/login" />;
        }
        return <Component {...props} />;
      }}
    />
  );
};

export default ProtectedRoute;
