import React from "react";

import { Routes, Route } from "react-router-dom";

import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import HomePage from "./HomePage";
import ThreadPage from "./ThreadPage";
import AccountPage from "./AccountPage";
import VideoPage from "./VideoPage";
import VideoPageVer2 from "./VideoPageVer2";
import VideoPageVer3 from "./VideoPageVer3";

import WorkshopPage from "./WorkshopPage";
import TagPage from "./TagPage";
import UserPage from "./UserPage";


const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" exact element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/create-new-account" element={<RegisterPage />} />
            <Route path="/user/:id" element={<UserPage />} />
            <Route path="/tag/:tag" element={<TagPage />} />
            <Route path="/thread/:slug" element={<ThreadPage />} />
            <Route path="/account/:username" element={<AccountPage />} />
            <Route path="/video/:videoname" element={<VideoPage />} />
            <Route path="/video-ver-2/:videoname" element={<VideoPageVer2 />} />
            <Route path="/video-ver-3/:videoname" element={<VideoPageVer3 />} />

            <Route path="/workshop/:username" element={<WorkshopPage />} />
            <Route path="/workshop/create/thread/:username" element={<WorkshopPage />} />
            <Route path="/workshop/dashboard/:username" element={<WorkshopPage />} />
            <Route path="/workshop/threads/:username" element={<WorkshopPage />} />
            <Route path="/workshop/comments/:username" element={<WorkshopPage />} />
            <Route path="/workshop/edit/thread/:slug" element={<WorkshopPage />} />
        </Routes>
    );
}

export default AppRouter;