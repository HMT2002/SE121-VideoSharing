// import React from "react";
// import Hls from "hls.js";
// const VideoHls=()=> {

//       const video = this.player;
//       const hls = new Hls();
//       const url = "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8";

//       hls.loadSource(url);
//       hls.attachMedia(video);
//       hls.on(Hls.Events.MANIFEST_PARSED, function() { video.play(); });

//     return (
//           <video
//             className="videoCanvas"
//             ref={player => (this.player = player)}
//             autoPlay={true}
//           />
//     );
// }
// export default VideoHls;

import React, { useContext, useEffect, useState, useRef, Component } from 'react';
import Hls from 'hls.js';
const VideoHls = () => {
  const player = useRef();

  useEffect(() => {
    const video = player.current;
    const hls = new Hls();
    const url = '/videos/convert/Undefined-Hatsune-Miku.m3u8';
    console.log('is Hls support? '+Hls.isSupported())
    hls.loadSource(url);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, function () {
      console.log('uma')
              console.log(player)

      try{
      video.play();

      }
      catch(error){
        console.log(error)
      }
    });
  }, []);

  return <video ref={player} controls loop autoPlay={true} />;
};
export default VideoHls;
