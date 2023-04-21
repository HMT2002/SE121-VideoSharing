import React from "react";
import { Routes, Route } from "react-router-dom";

import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import RegisterPage from "./RegisterPage";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" exact element={<HomePage />} />
        </Routes>
    );
}

export default AppRouter;