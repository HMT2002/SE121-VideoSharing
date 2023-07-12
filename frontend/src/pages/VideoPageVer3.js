import React, { useContext, useEffect, useState ,useRef} from "react";

import { useParams, useNavigate } from "react-router-dom";

import Card from "../components/UI elements/Card";
import videojs from "video.js";
import "../styles/ThreadPage.css";

const VideoPageVer3 = () => {
    const params = useParams();
    const videoNode = useRef(null);
    const [player, setPlayer] = useState(null);
    const[play_source,setPlaySource]=useState(null); 


    useEffect(() => {
    const LoadVideo = async () => {
        try {

          const response = await fetch('/api/test/video-convert/test-phase-convert-video/'+params.videoname, {
            method: 'GET',
            headers: {
                // 'Content-Type': 'application/json',
                // Authorization: storedToken,
            },
        });
        const data = await response.json();
        var obj_play;
        if(data.status){
          if(data.status==='found and converted'){
            obj_play={
              fill: true,
              fluid: true,
              autoplay: true,
              controls: true,
              preload: "metadata",
              loop:true,
              sources: [
                {
                  src:data.path,
                  type: "application/x-mpegURL"
                }
              ]
            }
          }

      }
        } catch (error) {
          console.log(error)
        }
    }
    LoadVideo();
    }, []);
    return (
        <React.Fragment>
            <Card className="thread-page__thread">
        <video ref={videoNode} className="video-js"></video>
            </Card>
        </React.Fragment>
    );
};

export default VideoPageVer3;