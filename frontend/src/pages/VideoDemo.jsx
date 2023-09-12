import React, { useContext, useEffect, useState, useRef } from 'react';

import { useParams, useNavigate } from 'react-router-dom';
import SubtitlesOctopus from '../components/subtitles/subtitles-octopus';
import videojs from 'video.js';
import toWebVTT from 'srt-webvtt';
import Card from '../components/UI elements/Card';
import Hls from 'hls.js';
import {
  POSTVideoUploadAction,
  POSTThreadAction,
  POSTLargeVideoUploadAction,
  POSTLargeVideoMutilpartUploadAction,
  POSTLargeVideoMutilpartUploadConcatenateAction,
} from '../APIs/thread-apis';
import Button from '../components/UI elements/Button';

import Utils from '../Utils';

import '../styles/ThreadPage.css';

const VideoDemo = () => {
  const params = useParams();
  const [source, setSource] = useState('/videos/MY Heart Rate.mp4');
  const videoNormal = useRef();
  const videoStreamingRTMPLinux = useRef();
  const videoHLS = useRef();
  const videoStreamingRTMPRed5 = useRef();
  const videoHLSRed5 = useRef();

  useEffect(() => {
    const LoadVideo = async () => {
      setSource((prevState) => '/videos/MY Heart Rate.mp4');
      try {
        var obj_play_HLS = {
          fill: true,
          fluid: true,
          autoplay: true,
          controls: true,
          preload: 'auto',
          loop: true,
          sources: [
            {
              src: '/videos/convert/MY Heart Rate.m3u8',
              type: 'application/x-mpegURL',
            },
          ],
        };
        const _playerHLS = videojs(videoHLS.current, obj_play_HLS, function onPlayerReady() {
          videojs.log('Your player is ready!');
          const defaultVolume = 0.4;
          this.volume(defaultVolume);
          this.on('ended', function () {
            videojs.log('Awww...over so soon?!');
          });
        });
      } catch (error) {
        console.log(error);
      }
    };

    LoadVideo();
  }, []);

  return (
    <React.Fragment>
      <Card className="thread-page__thread">
        <video className="video-js thread-page__thread-video" controls src={source} ref={videoNormal} />
        <video ref={videoHLS} className="video-js"></video>
        <video
          ref={videoStreamingRTMPRed5}
          controls
          className="video-js thread-page__thread-video"
          src="http://localhost:5080/oflaDemo/ハルジオン.mp4"
        ></video>
      </Card>
    </React.Fragment>
  );
};

export default VideoDemo;
