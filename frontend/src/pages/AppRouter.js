import React from "react";

import { Routes, Route } from "react-router-dom";

import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import HomePage from "./HomePage";
import ThreadPage from "./ThreadPage";
import AccountPage from "./AccountPage";
import VideoPage from "./VideoPage";


const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" exact element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/create-new-account" element={<RegisterPage />} />
            <Route path="/thread/:slug" element={<ThreadPage />} />
            <Route path="/account/:username" element={<AccountPage />} />
            <Route path="/video/:videoname" element={<VideoPage />} />

        </Routes>
    );
}

export default AppRouter;