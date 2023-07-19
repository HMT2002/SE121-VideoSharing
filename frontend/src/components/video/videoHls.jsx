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
const VideoHls = (props) => {
  const player = useRef();

  useEffect(() => {
    const loadVideo = async () => {
      const response = await fetch('/api/test/video-convert/test-phase-convert-video/' + props.videoname, {
        method: 'GET',
        headers: {
          // 'Content-Type': 'application/json',
          // Authorization: storedToken,
        },
      });
      const data = await response.json();
      if (!data.status === 'found and converted') {
        return;
      }

      const video = player.current;
      const hls = new Hls();
      const url = data.path;
      console.log('is Hls support? ' + Hls.isSupported());
      hls.loadSource(url);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        console.log('uma');
        console.log(player);

        try {
          video.play();
        } catch (error) {
          console.log(error);
        }
      });
    };

    loadVideo();
  }, []);

  return <video ref={player} controls loop autoPlay={true} />;
};
export default VideoHls;
