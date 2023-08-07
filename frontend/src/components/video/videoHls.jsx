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
import './videoHls.css';
import React, { useContext, useEffect, useState, useRef, Component } from 'react';
import Hls from 'hls.js';

import { TimelineChart } from './../chart/timeline-chart.ts';

function customLogger(logContent) {
  const color = 'color: white; background-color: black;';

  //console.log(`%c${logContent}`, `${color} font-size: 13px; text-align: center; padding: 12px 100px; display:block`);
}
const customeBoxMessage = (prevState, className, content) => {
  return (
    <React.Fragment>
      {prevState}
      <br />
      <div className={className}>{content}</div>
      <br />
    </React.Fragment>
  );
};

const decodeString = (encodeURI) => {
  return decodeURIComponent(encodeURI);
};
const VideoHls = (props) => {
  const player = useRef();
  const canvas = useRef();

  const [logger, setLogger] = useState('');
  const [eventLogger, setEventLogger] = useState('');
  const [chart, setChart] = useState();

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

      var url = data.path;
      if (props.videoname === 'stein') {
        url = 'http://192.168.140.104/stein.m3u8';
      }
      // else if(props.videoname==='cc'){
      //   url='http://192.168.140.104/cc.m3u8';

      // }
      //console.log('is Hls support? ' + Hls.isSupported());
      hls.loadSource(url);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        //console.log(player);
        setLogger((prevState) => {
          return customeBoxMessage(
            prevState,
            'logger-message-MANIFEST_PARSE',
            <>
              {decodeString(player.current.baseURI)}
              <br />
              {decodeString(player.current.currentSrc)}
            </>
          );
        });
        try {
          video.play();
        } catch (error) {
          //console.log(error);
        }
      });

      const updateFragment = (eventName, data) => {
        //console.log(eventName);

        //console.log('data.frag.stats');
        //console.log(data.frag.stats);
        //console.log('data.frag');
        //console.log(data.frag);
        //console.log('data');
        //console.log(data);
        if (data.frag.stats) {
          // Convert 0.x stats to partial v1 stats
          const { retry, loaded, total, trequest, tfirst, tload } = data.frag.stats;
          if (trequest && tload) {
            data.frag.stats = {
              loaded,
              retry,
              total,
              loading: {
                start: trequest,
                first: tfirst,
                end: tload,
              },
            };
            setChart((prevState) => {
              return setupTimelineChart;
            });
            chart.updateFragment(data);
          }
        }

        try {
          setLogger((prevState) => {
            return customeBoxMessage(prevState, 'logger-message-' + eventName, <>{eventName}</>);
          });
        } catch (error) {
          setLogger((prevState) => {
            return customeBoxMessage(
              prevState,
              'logger-message-' + eventName,
              <>
                {eventName}
                <br />
                Error:{error}
              </>
            );
          });
        }

        //chart.updateFragment(data);
      };

      const updateChart = () => {
        chart.update();
      };

      hls.on(Hls.Events.FRAG_LOADED, updateFragment, chart);
      hls.on(Hls.Events.FRAG_PARSED, updateFragment, chart);
      hls.on(Hls.Events.FRAG_CHANGED, updateFragment, chart);
      hls.on(Hls.Events.BUFFER_APPENDING, updateChart, chart);
      hls.on(Hls.Events.BUFFER_APPENDED, updateChart, chart);
      hls.on(Hls.Events.BUFFER_FLUSHED, updateChart, chart);

      // hls.on(Hls.Events.MANIFEST_LOADED, function () {
      //   try {
      //     setLogger((prevState)=>{return customeBoxMessage (prevState,'logger-message-MANIFEST_LOADED',(<>Events.MANIFEST_LOADED</>))});
      //   } catch (error)
      //   {
      //     setLogger((prevState)=>{return customeBoxMessage (prevState,'logger-message-MANIFEST_LOADED',(<>Events.MANIFEST_LOADED<br/>Error:{error}</>))});
      //   }
      // });

      // hls.on(Hls.Events.FRAG_LOADED, function (eventName,data) {
      //   try {
      //     setLogger((prevState)=>{return customeBoxMessage(prevState,'logger-message-FRAG_LOADED',(<>Events.FRAG_LOADED</>))});
      //   } catch (error)
      //   {
      //     setLogger((prevState)=>{return customeBoxMessage (prevState,'logger-message-FRAG_LOADED',(<>Events.FRAG_LOADED<br/>Error:{error}</>))});
      //   }
      // });

      // hls.on(Hls.Events.FRAG_BUFFERED, function () {
      //   try {
      //     setLogger((prevState)=>{return customeBoxMessage(prevState,'logger-message-FRAG_BUFFERED',(<>Events.FRAG_BUFFERED</>))});

      //   } catch (error)
      //   {
      //     setLogger((prevState)=>{return customeBoxMessage (prevState,'logger-message-FRAG_BUFFERED',(<>Events.FRAG_BUFFERED<br/>Error:{error}</>))});
      //   }
      // });

      // hls.on(Hls.Events.FRAG_CHANGED, function (eventName,data) {
      //   try {
      //     setLogger((prevState)=>{return customeBoxMessage(prevState,'logger-message-FRAG_CHANGED',(<>Events.FRAG_CHANGED</>))});

      //   } catch (error)
      //   {
      //     setLogger((prevState)=>{return customeBoxMessage (prevState,'logger-message-FRAG_CHANGED',(<>Events.FRAG_CHANGED<br/>Error:{error}</>))});
      //   }
      // },chart);

      // hls.on(Hls.Events.FRAG_DECRYPTED, function () {
      //   try {
      //     setLogger((prevState)=>{return customeBoxMessage(prevState,'logger-message-FRAG_DECRYPTED',(<>Events.FRAG_DECRYPTED</>))});
      //   } catch (error)
      //   {
      //     setLogger((prevState)=>{return customeBoxMessage (prevState,'logger-message-FRAG_DECRYPTED',(<>Events.FRAG_DECRYPTED<br/>Error:{error}</>))});
      //   }
      // });

      // hls.on(Hls.Events.FRAG_LOADING, function () {
      //   try {
      //     setLogger((prevState)=>{return customeBoxMessage(prevState,'logger-message-FRAG_LOADING',(<>Events.FRAG_LOADING</>))});
      //   } catch (error)
      //   {
      //     setLogger((prevState)=>{return customeBoxMessage (prevState,'logger-message-FRAG_LOADING',(<>Events.FRAG_LOADING<br/>Error:{error}</>))});
      //   }
      // });

      // hls.on(Hls.Events.FRAG_PARSED, function (eventName,data) {
      //   try {
      //     setLogger((prevState)=>{return customeBoxMessage(prevState,'logger-message-FRAG_PARSED',(<>Events.FRAG_PARSED</>))});

      //   } catch (error)
      //   {
      //     setLogger((prevState)=>{return customeBoxMessage (prevState,'logger-message-FRAG_PARSED',(<>Events.FRAG_PARSED<br/>Error:{error}</>))});
      //   }
      // });
    };
    let resizeAsyncCallbackId = -1;

    const requestAnimationFrame = window.self.requestAnimationFrame || window.self.setTimeout;
    const cancelAnimationFrame = window.self.cancelAnimationFrame || window.self.clearTimeout;
    const resizeHandlers = [];

    const resize = () => {
      cancelAnimationFrame(resizeAsyncCallbackId);
      resizeAsyncCallbackId = requestAnimationFrame(() => {
        resizeHandlers.forEach((handler) => {
          handler();
        });
      });
    };

    const setupTimelineChart = () => {
      console.log(canvas)
      const chart = new TimelineChart(canvas.current, {
        responsive: false,
      });
      console.log('chart now is: ');
      console.log(chart);

      resizeHandlers.push(() => {
        chart.resize();
      });
      chart.resize();

      return chart;

    };
    setChart((prevState) => {
      const timechart=setupTimelineChart();
      console.log(timechart)
      return timechart;
    });

    loadVideo();

  }, []);

  return (
    <React.Fragment>
      <div className="main-div">
        <div>
          <video className="hls-main-video" ref={player} controls loop autoPlay={true} />
        </div>
        <canvas ref={canvas} />


        <div className="event-status">
          <pre>
            0.039 | Loading https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8 0.061 | Loading manifest and attaching
            video element... 0.768 | 5 quality levels found 0.769 | Manifest successfully loaded 2.072 | Media element
            attached
          </pre>
          <div className="logger-box">
            <div>{logger}</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default VideoHls;
