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
import './videoHls.css'
import React, { useContext, useEffect, useState, useRef, Component } from 'react';
import Hls from 'hls.js';
const VideoHls = (props) => {
  const player = useRef();
  const [logger,setLogger]=useState('');

  useEffect(() => {
    const loadVideo = async () => {
      const encodeUri = encodeURI('/api/test/video-convert/test-phase-convert-video/' + props.videoname);
      const response = await fetch(encodeUri, {
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
        console.log(player);
        setLogger((prevState)=>{return (<React.Fragment>{prevState}<br/>{player.current.baseURI}<br/>{player.current.currentSrc}</React.Fragment>)});
        try {
          video.play();
        } catch (error) {
          console.log(error);
        }
      });

      hls.on(Hls.Events.MANIFEST_LOADED, function () {
        try {
          setLogger((prevState)=>{return (<React.Fragment>{prevState}<br/><div className='logger-message-MANIFEST_LOADED'>Events.MANIFEST_LOADED</div><br/></React.Fragment>)});
        } catch (error)
        {
          setLogger((prevState)=>{return (<React.Fragment><div className='logger-message-MANIFEST_LOADED'>{prevState}<br/>{error}</div><br/></React.Fragment>)})
        }
      });    

      hls.on(Hls.Events.FRAG_LOADED, function () {
        try {
          setLogger((prevState)=>{return (<React.Fragment>{prevState}<br/><div className='logger-message-FRAG_LOADED'>Events.FRAG_LOADED</div><br/></React.Fragment>)});
        } catch (error)
        {
          setLogger((prevState)=>{return (<React.Fragment><div className='logger-message-FRAG_LOADED'>{prevState}<br/>{error}</div><br/></React.Fragment>)})
        }
      });    

      hls.on(Hls.Events.FRAG_BUFFERED, function () {
        try {
          setLogger((prevState)=>{return (<React.Fragment>{prevState}<br/><div className='logger-message-FRAG_BUFFERED'>Events.FRAG_BUFFERED</div><br/></React.Fragment>)});
        } catch (error)
        {
          setLogger((prevState)=>{return (<React.Fragment><div className='logger-message-FRAG_BUFFERED'>{prevState}<br/>{error}</div><br/></React.Fragment>)})
        }
      });    

      hls.on(Hls.Events.FRAG_CHANGED, function () {
        try {
          setLogger((prevState)=>{return (<React.Fragment>{prevState}<br/><div className='logger-message-FRAG_CHANGED'>Events.FRAG_CHANGED</div><br/></React.Fragment>)});
        } catch (error)
        {
          setLogger((prevState)=>{return (<React.Fragment><div  className='logger-message-FRAG_CHANGED'>{prevState}<br/>{error}</div><br/></React.Fragment>)})
        }
      });    

      hls.on(Hls.Events.FRAG_DECRYPTED, function () {
        try {
          setLogger((prevState)=>{return (<React.Fragment>{prevState}<br/><div className='logger-message-FRAG_DECRYPTED'>Events.FRAG_DECRYPTED</div><br/></React.Fragment>)});
        } catch (error)
        {
          setLogger((prevState)=>{return (<React.Fragment><div  className='logger-message-FRAG_DECRYPTED'>{prevState}<br/>{error}</div><br/></React.Fragment>)})
        }
      });    

      hls.on(Hls.Events.FRAG_LOADING, function () {
        try {
          setLogger((prevState)=>{return (<React.Fragment>{prevState}<br/><div className='logger-message-FRAG_LOADING'>Events.FRAG_LOADING</div><br/></React.Fragment>)});
        } catch (error)
        {
          setLogger((prevState)=>{return (<React.Fragment><div  className='logger-message-FRAG_LOADING'>{prevState}<br/>{error}</div><br/></React.Fragment>)})
        }
      });   

      hls.on(Hls.Events.FRAG_PARSED, function () {
        try {

          setLogger((prevState)=>{return (<React.Fragment>{prevState}<br/><div className='logger-message-FRAG_PARSED'>Events.FRAG_PARSED</div><br/></React.Fragment>)});
        } catch (error)
        {
        setLogger((prevState)=>{return (<React.Fragment><div className='logger-message-FRAG_PARSED'>{prevState}<br/>{error}</div><br/></React.Fragment>)})
        }
      });  
    };

    loadVideo();
  }, []);

  return (
    <React.Fragment>
      <video ref={player} controls loop autoPlay={true} />
      <div className='logger-box'>
        <div>Message, Event</div>
        <br />
        <div>{logger}</div>
      </div>
    </React.Fragment>
  );
};
export default VideoHls;
