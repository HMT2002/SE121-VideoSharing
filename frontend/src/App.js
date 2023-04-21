import React from "react";
import { Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <React.Fragment>
      <Route path="/login">
        <LoginPage />
      </Route>
      <Route path="/" exact>
        <HomePage />
      </Route>
    </React.Fragment>
  );
}

export default App;
