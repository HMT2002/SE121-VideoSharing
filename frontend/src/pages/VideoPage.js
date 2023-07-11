import React, { useContext, useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import Utils from "../Utils";
import AuthContext from "../contexts/auth-context";
import Card from "../components/UI elements/Card";

import "../styles/ThreadPage.css";

const VideoPage = () => {

    const params = useParams();



    return (
        <React.Fragment>
            <Card className="thread-page__thread">
                <video
                    className="video-js thread-page__thread-video"
                    controls
                    autoPlay={true}
                    src={'/api/test/video-stream-file/'+params.videoname}
                    loop={true}
                    type="video/mp4" />
            </Card>
        </React.Fragment>
    );
};

export default VideoPage;