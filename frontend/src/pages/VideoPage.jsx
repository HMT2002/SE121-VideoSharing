import React, { useContext, useEffect, useState } from 'react';

import { useParams, useNavigate } from 'react-router-dom';

import Utils from '../Utils';
import AuthContext from '../contexts/auth-context';
import Card from '../components/UI elements/Card';

import '../styles/ThreadPage.css';

const VideoPage = () => {
  const params = useParams();
  const [source, setSource] = useState('/videos/convert/' + params.videoname + '.m3u8');

  useEffect(() => {
    const LoadVideo = async () => {
      try {
        //   const response = await fetch('/api/video/video-proc/convert-stream/'+params.videoname, {
        //     method: 'GET'
        // });
        // const data = await response.json();
        // if(data.status){
        //   if(data.status==='found and converted'){
        //   }
        //   else{
        //   }
        // }
      } catch (error) {
        console.log(error);
      }
      if (params.videoname === 'test-file-upload-formdata') {
        // có khả năng nhận về file sub định dạng vtt vì bên server nginx có hỗ trợ host file toàn tập, node thì không thấy.
        // url = 'http://192.168.140.104/tmp/convert/哀の隙間 - feat.初音ミク.m3u8';
        const url = 'http://192.168.140.104/tmp/prep/fileformdata';
        setSource((prevState) => url);
        console.log(url);
      } else {
        setSource((prevState) => '/videos/convert/' + params.videoname + '.m3u8');
      }
    };
    LoadVideo();
  }, []);

  return (
    <React.Fragment>
      <Card className="thread-page__thread">
        <video
          className="video-js thread-page__thread-video"
          controls
          autoPlay={true}
          src={source}
          loop={true}
          type="application/x-mpegURL"
        />
      </Card>
    </React.Fragment>
  );
};

export default VideoPage;
