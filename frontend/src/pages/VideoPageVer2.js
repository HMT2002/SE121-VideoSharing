import React, { useContext, useEffect, useState ,useRef} from "react";

import { useParams, useNavigate } from "react-router-dom";

import Card from "../components/UI elements/Card";
import videojs from "video.js";
import "../styles/ThreadPage.css";
    const play = {
        fill: true,
        fluid: true,
        autoplay: true,
        controls: true,
        preload: "metadata",
        loop:true,
        sources: [
          {
            // src: "/videos/convert/7.m3u8",
            src:'',
            type: "application/x-mpegURL"
          }
        ]
      };


const VideoPageVer2 = () => {
    const params = useParams();
    const videoNode = useRef(null);
    const [player, setPlayer] = useState(null);
    const[play_source,setPlaySource]=useState(null); 


    useEffect(() => {
    const CheckVideoAndEncode=async()=>{
      const response = await fetch('/api/test/video-convert/test-phase-convert-video/'+params.videoname, {
        method: 'GET',
        headers: {
            // 'Content-Type': 'application/json',
            // Authorization: storedToken,
        },
    });
    const data = await response.json();
    if(data.status){
      if(data.status==='found and converted'){
        setPlaySource(prevState=>{return  {
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
        }}
        )
      }
    }

  }
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
              preload: "auto",
              loop:true,
              sources: [
                {
                  src:data.path,
                  type: "application/x-mpegURL",
                  withCredentials: true

                }
              ]
            }
          }
          else{
            
          }
        }

        const _player = videojs('my-player', obj_play,function onPlayerReady() {
          videojs.log('Your player is ready!');
        
          // In this context, `this` is the player that was created by Video.js.
          this.play();
        
          // How about an event listener?
          this.on('ended', function() {
            videojs.log('Awww...over so soon?!');
          });
        });

        // _player.on('xhr-hooks-ready', () => {
        //   const playerRequestHook = (options) => {
        //     options.beforeSend = (xhr) => {
        //       xhr.setRequestHeader('foo', 'bar');
        //     };
        //     console.log(options)
        //     return options;
        //   };
        //   _player.tech().vhs.xhr.onResponse(playerRequestHook);
        // });

        } catch (error) {
          console.log(error)
        }
    }
      //CheckVideoAndEncode();
      LoadVideo();
    }, []);
    return (
        <React.Fragment>
            <Card className="thread-page__thread">
        <video id="my-player" className="video-js"></video>
            </Card>
        </React.Fragment>
    );
};

export default VideoPageVer2;