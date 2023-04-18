import './App.css';
import React, { useState, useEffect, useCallback, useContext } from 'react';

import NewThread from './pages/NewThread/NewThread';
import Welcome from './pages/Welcome/Welcome';
import TestPage from './pages/TestPage/TestPage';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Thread from './pages/Thread/Thread';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/Route/ProtectRoute';
import AuthContext from './store/auth-context';

function App() {
  const authCtx = useContext(AuthContext);
  console.log(authCtx.isLoggedIn);
  console.log(authCtx.role);

  return (
    <React.Fragment>
      <Routes>
        <Route path="/" exact element={<Welcome />}></Route>
        <Route path="*" element={<Navigate to="/" replace />} />
        {/* <Route path="/threads" exact element={<Welcome />}></Route> */}
        <Route path="/user-info" exact element={!authCtx.isLoggedIn && <Welcome />}></Route>
        <Route
          path="/create-thread"
          exact
          element={
            authCtx.isLoggedIn && (authCtx.role === 'content-creator' || authCtx.role === 'admin') ? (
              <NewThread />
            ) : (
              <Navigate to="/" />
            )
          }
        ></Route>
        <Route path="/test" exact element={<TestPage />}></Route>
        <Route path="/sign/in" exact element={authCtx.isLoggedIn ? <Navigate to="/" /> : <SignIn />}></Route>
        <Route path="/sign/up" exact element={authCtx.isLoggedIn ? <Navigate to="/" /> : <SignUp />}></Route>
        <Route path="/threads/:slug" exact element={<Thread />}></Route>
      </Routes>
    </React.Fragment>
  );
}

export default App;
