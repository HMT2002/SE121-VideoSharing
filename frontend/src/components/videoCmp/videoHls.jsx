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

import { TimelineChart } from '../chart/timeline-chart.ts';

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
  const [eventInfo, setEventInfo] = useState({});
  const [eventLog, setEventLog] = useState('');

  const [chart, setChart] = useState();

  const eventInfoHandler = (eventName, info) => {
    console.log('eventName');
    console.log(eventName);
    console.log('info');
    console.log(info);
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
    const ename = eventName || 'first event';

    setEventInfo((prevState) => {
      prevState[ename] = eventName;
      return { ...prevState };
    });
    setEventLog((prevState) => {
      return prevState + '\n ' + eventName + '\t' + typeof info;
    });

    return;
  };

  useEffect(() => {
    const loadVideo = async () => {
      var url = '';
      const encodeUri = encodeURI('/api/test/video-convert/test-phase-convert-video/' + props.videoname);
      const response = await fetch(encodeUri, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Authorization: storedToken,
        },
      });
      console.log(response);
      if (response.status !==500) {
        const data = await response.json();
        if (!data.status === 'found and converted') {
          setEventLog('not found video on backend!');
        } else {
          url = data.path;
          console.log(data.path)
        }
      }

      const video = player.current;
      const config = {
        startPosition: 0 // can be any number you want
       }
      const hls = new Hls(config);
      if (props.videoname === 'stein') {
        url = 'http://192.168.140.104/tmp/hls/stein.m3u8';
      }
      // else if(props.videoname==='cc'){
      //   url='http://192.168.140.104/cc.m3u8';

      // }
      else if (props.videoname === 'test-front-hls') {
        url = 'http://localhost:3000/videos/hls/無意識.m3u8';
      }
      else if(props.videoname === '無意識'){
        url = 'http://localhost:9000/videos/convert/master.m3u8';
        console.log(url)
      }
      else if(props.videoname === '哀の隙間 - feat.初音ミク-nginx'){
        // có khả năng nhận về file sub định dạng vtt vì bên server nginx có hỗ trợ host file toàn tập, node thì không thấy.
        // url = 'http://192.168.140.104/tmp/convert/哀の隙間 - feat.初音ミク.m3u8';
        url = 'http://192.168.140.104/tmp/convert/master.m3u8';

        console.log(url)
      }

      //console.log('is Hls support? ' + Hls.isSupported());
      hls.loadSource(url);
      hls.attachMedia(video);
      hls.subtitleDisplay=true;
      const updateLevelOrTrack = (eventName, data) => {
        eventInfoHandler(eventName, data);
        chart.updateLevelOrTrack(data.details);
      };
      const updateChart = (eventName, data) => {
        eventInfoHandler(eventName, data);
        chart.update();
      };

      const updateFragment = (eventName, data) => {
        eventInfoHandler(eventName, data);
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
          }
        }
        chart.updateFragment(data);
      };

      hls.on(Hls.Events.ERROR, function (event, data) {
        var errorType = data.type;
        var errorDetails = data.details;
        var errorFatal = data.fatal;
        console.log(event)
        console.log(data);
      });
      hls.on(
        Hls.Events.MANIFEST_LOADING,
        (eventName, info) => {
          eventInfoHandler(eventName, info);
          chart.reset();
        },
        chart
      );
      hls.on(
        Hls.Events.MANIFEST_PARSED,
        (eventName, info) => {
          eventInfoHandler(eventName, info);
          chart.removeType('level');
          chart.removeType('audioTrack');
          chart.removeType('subtitleTrack');
          chart.updateLevels(info.levels);
          try {
            video.play();
          } catch (error) {
            //console.log(error);
          }
        },
        chart
      );
      hls.on(
        Hls.Events.BUFFER_CREATED,
        (eventName, info) => {
          eventInfoHandler(eventName, info);
          chart.updateSourceBuffers(info.tracks, hls.media);
        },
        chart
      );
      hls.on(
        Hls.Events.BUFFER_RESET,
        (eventName, info) => {
          eventInfoHandler(eventName, info);
          chart.removeSourceBuffers();
        },
        chart
      );
      hls.on(Hls.Events.LEVELS_UPDATED, (eventName, info) => {
        eventInfoHandler(eventName, info);
        chart.removeType('level');
        chart.updateLevels(info.levels);
      });
      hls.on(
        Hls.Events.LEVEL_SWITCHED,
        (eventName, info) => {
          eventInfoHandler(eventName, info);
          chart.removeType('level');
          chart.updateLevels(hls.levels, info.level);
        },
        chart
      );
      hls.on(
        Hls.Events.LEVEL_LOADING,
        (eventName, info) => {
          eventInfoHandler(eventName, info);
          // TODO: mutate level datasets
          // Update loadLevel
          chart.removeType('level');
          chart.updateLevels(hls.levels);
        },
        chart
      );
      hls.on(
        Hls.Events.LEVEL_UPDATED,
        (eventName, info) => {
          eventInfoHandler(eventName, info);
          chart.updateLevelOrTrack(info.details);
        },
        chart
      );

      hls.on(
        Hls.Events.AUDIO_TRACKS_UPDATED,
        (eventName, info) => {
          eventInfoHandler(eventName, info);
          chart.removeType('audioTrack');
          chart.updateAudioTracks(info.audioTracks);
        },
        chart
      );
      hls.on(
        Hls.Events.SUBTITLE_TRACKS_UPDATED,
        (eventName, info) => {
          eventInfoHandler(eventName, info);
          chart.removeType('subtitleTrack');
          chart.updateSubtitleTracks(info.subtitleTracks);
        },
        chart
      );

      hls.on(
        Hls.Events.AUDIO_TRACK_SWITCHED,
        (eventName, info) => {
          eventInfoHandler(eventName, info);
          // TODO: mutate level datasets
          chart.removeType('audioTrack');
          chart.updateAudioTracks(hls.audioTracks);
        },
        chart
      );
      hls.on(
        Hls.Events.SUBTITLE_TRACK_SWITCH,
        (eventName, info) => {
          eventInfoHandler(eventName, info);
          // TODO: mutate level datasets
          chart.removeType('subtitleTrack');
          chart.updateSubtitleTracks(hls.subtitleTracks);
        },
        chart
      );
      hls.on(Hls.Events.AUDIO_TRACK_LOADED, updateLevelOrTrack, chart);
      hls.on(Hls.Events.SUBTITLE_TRACK_LOADED, updateLevelOrTrack, chart);
      hls.on(Hls.Events.LEVEL_PTS_UPDATED, updateLevelOrTrack, chart);
      hls.on(Hls.Events.FRAG_LOADED, updateFragment, chart);
      hls.on(Hls.Events.FRAG_PARSED, updateFragment, chart);
      hls.on(Hls.Events.FRAG_CHANGED, updateFragment, chart);
      hls.on(Hls.Events.BUFFER_APPENDING, updateChart, chart);
      hls.on(Hls.Events.BUFFER_APPENDED, updateChart, chart);
      hls.on(Hls.Events.BUFFER_FLUSHED, updateChart, chart);
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
      console.log(canvas);
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
      const timechart = setupTimelineChart();
      // console.log(timechart)
      return timechart;
    });
    try{
    loadVideo();

    }
    catch(ex){
      console.log(ex)
    }
  }, []);

  return (
    <React.Fragment>
      <div className="main-div">
        <div>
          <video className="hls-main-video" ref={player} controls loop autoPlay={true} />
        </div>
        <canvas className="canvas-main-video" ref={canvas} />

        <div className="event-status">
          <pre className="pre-current-status">{eventLog}</pre>
          <div className="logger-box">
            <div>{logger}</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default VideoHls;
