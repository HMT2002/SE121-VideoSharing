import React, { useContext, useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import Utils from "../Utils";
import AuthContext from "../contexts/auth-context";
import Card from "../components/UI elements/Card";

import "../styles/ThreadPage.css";

const VideoPage = () => {

    const params = useParams();
    const [source,setSource]=useState('/videos/convert/'+params.videoname+'.m3u8');

    // useEffect(() => {
    //     const LoadVideo = async () => {
    //         try {
    //           const response = await fetch('/api/test/video-convert/test-phase-convert-video/'+params.videoname, {
    //             method: 'GET'
    //         });
    //         const data = await response.json();
    //         if(data.status){
    //           if(data.status==='found and converted'){

    //           }
    //           else{
                
    //           }
    //         }
    //     }
    //     catch(error){
    //         console.log(error)
    //     }
    // }
    //       LoadVideo();
    //       setSource(prevState=>'/videos/convert/'+params.videoname+'.m3u8')
    //     }, [params.videoname]);

    return (
        <React.Fragment>
            <Card className="thread-page__thread">
                <video
                    className="video-js thread-page__thread-video"
                    controls
                    autoPlay={true}
                    src={source}
                    loop={true}
                    type= "application/x-mpegURL"
                     />

            </Card>
        </React.Fragment>
    );
};

export default VideoPage;