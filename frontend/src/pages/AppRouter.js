import React from "react";
import { Routes, Route } from "react-router-dom";

import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import HomePage from "./HomePage";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/create-new-account" element={<RegisterPage />} />
            <Route path="/" exact element={<HomePage />} />
        </Routes>
    );
}

export default AppRouter;