import React, { useContext, useEffect, useState, useRef } from 'react';

import { useParams, useNavigate } from 'react-router-dom';

import Card from '../components/UI elements/Card';
import videojs from 'video.js';
import SubtitlesOctopus from '../components/subtitles/subtitles-octopus';

import '../styles/ThreadPage.css';
const play = {
  fill: true,
  fluid: true,
  autoplay: true,
  controls: true,
  preload: 'metadata',
  loop: true,
  sources: [
    {
      // src: "/videos/convert/7.m3u8",
      src: '',
      type: 'application/x-mpegURL',
    },
  ],
};

const VideoPageVer2 = () => {
  const params = useParams();
  const videoNode = useRef(null);
  const [player, setPlayer] = useState(null);
  const [play_source, setPlaySource] = useState(null);

  useEffect(() => {
    const CheckVideoAndEncode = async () => {
      const response = await fetch('/api/video/video-proc/convert-stream/' + params.videoname, {
        method: 'GET',
        headers: {
          // 'Content-Type': 'application/json',
          // Authorization: storedToken,
        },
      });
      const data = await response.json();
      if (data.status) {
        if (data.status === 'found and converted') {
          setPlaySource((prevState) => {
            return {
              fill: true,
              fluid: true,
              autoplay: true,
              controls: true,
              preload: 'metadata',
              loop: true,
              sources: [
                {
                  src: data.path,
                  type: 'application/x-mpegURL',
                },
              ],
            };
          });
        }
      }
    };
    const LoadVideo = async () => {
      try {
        var obj_play;

        if (params.videoname === 'bbb') {
          obj_play = {
            fill: true,
            fluid: true,
            autoplay: true,
            controls: true,
            preload: 'auto',
            loop: true,
            sources: [
              {
                src: 'http://192.168.140.104/tmp/hls/bbb.m3u8',
                type: 'application/x-mpegURL',
                // withCredentials: true,

                // type:'video/flv',
              },
            ],
            // liveui: true,
            // techorder : ["flash","html5"],
          };
        } else if (params.videoname === 'aa') {
          obj_play = {
            fill: true,
            fluid: true,
            autoplay: true,
            controls: true,
            preload: 'auto',
            loop: true,
            sources: [
              {
                src: 'http://192.168.140.104/tmp/hls/aa.m3u8',
                type: 'application/x-mpegURL',
                // withCredentials: true,

                // type:'video/flv',
              },
            ],
            // liveui: true,
            // techorder : ["flash","html5"],
          };
        } else if (params.videoname === 'bb') {
          obj_play = {
            fill: true,
            fluid: true,
            autoplay: true,
            controls: true,
            preload: 'auto',
            loop: true,
            sources: [
              {
                src: 'http://192.168.140.104/tmp/hls/bb.m3u8',
                type: 'application/x-mpegURL',
                // withCredentials: true,

                // type:'video/flv',
              },
            ],
            // liveui: true,
            // techorder : ["flash","html5"],
          };
        } else if (params.videoname === 'cc') {
          obj_play = {
            fill: true,
            fluid: true,
            autoplay: true,
            controls: true,
            preload: 'auto',
            loop: true,
            sources: [
              {
                src: 'http://192.168.140.104/tmp/hls/cc.m3u8',
                type: 'application/x-mpegURL',
                // withCredentials: true,

                // type:'video/flv',
              },
            ],
            // liveui: true,
            // techorder : ["flash","html5"],
          };
        } else if (params.videoname === 'dd') {
          obj_play = {
            fill: true,
            fluid: true,
            autoplay: true,
            controls: true,
            preload: 'auto',
            loop: true,
            sources: [
              {
                src: 'http://192.168.140.104/tmp/hls/dd.m3u8',
                type: 'application/x-mpegURL',
                // withCredentials: true,

                // type:'video/flv',
              },
            ],
            // liveui: true,
            // techorder : ["flash","html5"],
          };
          
        }
        else if (params.videoname === 'ee') {
          obj_play = {
            fill: true,
            fluid: true,
            autoplay: true,
            controls: true,
            preload: 'auto',
            loop: true,
            sources: [
              {
                src: 'http://192.168.140.104/tmp/hls/ee.m3u8',
                type: 'application/x-mpegURL',
                // withCredentials: true,

                // type:'video/flv',
              },
            ],
            // liveui: true,
            // techorder : ["flash","html5"],
          };
          
        } 
        else if (params.videoname === 'stein') {
          obj_play = {
            fill: true,
            fluid: true,
            autoplay: true,
            controls: true,
            preload: 'auto',
            loop: true,
            sources: [
              {
                src: 'http://192.168.140.104/stein.m3u8',
                type: 'application/x-mpegURL',
                // withCredentials: true,

                // type:'video/flv',
              },
            ],
            // liveui: true,
            // techorder : ["flash","html5"],
          };
        } else {
          const response = await fetch('/api/video/video-proc/convert-stream/' + params.videoname, {
            method: 'GET',
            headers: {
              // 'Content-Type': 'application/json',
              // Authorization: storedToken,
            },
          });
          const data = await response.json();
          console.log(data);
          if (data.status) {
            if (data.status === 'found and converted') {
              let uri = data.path;
              obj_play = {
                fill: true,
                fluid: true,
                autoplay: true,
                controls: true,
                preload: 'auto',
                loop: true,
                sources: [
                  {
                    src: data.path,
                    type: 'application/x-mpegURL',
                    withCredentials: true,
                  },
                ],
              };
            } else {
            }
          }
        }
        const subResponse = await fetch('/videos/' + params.videoname + '.ass', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Authorization: storedToken,
          },
        });
        if (subResponse.status != 500) {
          // console.log('for some reason jump here')
          var options = {
            video: videoNode.current, // HTML5 video element
            subUrl: '/videos/' + params.videoname + '.ass', // Link to subtitles
            // fonts: ['/test/font-1.ttf', '/test/font-2.ttf'], // Links to fonts (not required, default font already included in build)
            fonts: ['/Arial.ttf', '/TimesNewRoman.ttf'],
            workerUrl: process.env.PUBLIC_URL + '/subtitles-octopus-worker.js', // Link to WebAssembly-based file "libassjs-worker.js"
            legacyWorkerUrl: process.env.PUBLIC_URL + '/subtitles-octopus-worker.js', // Link to non-WebAssembly worker
          };
          var instance = new SubtitlesOctopus(options);
          console.log(instance);
        }
        const _player = videojs(videoNode.current, obj_play, function onPlayerReady() {
          videojs.log('Your player is ready!');

          // In this context, `this` is the player that was created by Video.js.
          this.play();

          // How about an event listener?
          this.on('ended', function () {
            videojs.log('Awww...over so soon?!');
          });
        });
        console.log(_player)


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
        console.log(error);
      }
    };
    //CheckVideoAndEncode();
    LoadVideo();
  }, []);
  return (
    <React.Fragment>
      <Card className="thread-page__thread">
        <video id="my-player" ref={videoNode} className="video-js"></video>
      </Card>
    </React.Fragment>
  );
};

export default VideoPageVer2;
