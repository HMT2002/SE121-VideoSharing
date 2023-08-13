import React, { useContext, useEffect, useState ,useRef, Component} from "react";

import { useParams, useNavigate } from "react-router-dom";
import Card from "../components/UI elements/Card";
import videojs from "video.js";
import "../styles/ThreadPage.css";
import VideoHls from "../components/videoCmp/videoHls"

const VideoPageVer3 = () => {
    const params = useParams();

    return (
        <React.Fragment>
          <VideoHls videoname={params.videoname}></VideoHls>
        </React.Fragment>

//         <video width="320" height="240" controls>
//    <source src="/videos/test.mp4" type="video/mp4" />
// </video>
    );
};

export default VideoPageVer3;