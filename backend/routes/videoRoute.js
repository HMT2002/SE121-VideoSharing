const express = require('express');
const fs = require('fs');
const videoController = require('../controllers/videoController');

const { upload, uploadVideo, uploadImage } = require('../modules/multerAPI.js');
const router = express.Router();
const tempHls = fs.readFileSync('./public/client.html', 'utf-8');

//ROUTE HANDLER
router.route('/upload-video-drive').post(uploadVideo, videoController.UploadNewFileDrive);
router.route('/upload-video-firebase').post(uploadVideo, videoController.UploadNewFileFirebase);

router.route('/ffmpeg').post(videoController.FFmpeg);
router.route('/video-stream-file/:filename').get(videoController.VideoStreamingFile);
router.route('/video-stream-hls/:filename').get(videoController.VideoStreamingHLS);
router.route('/video-proc/convert-stream/:filename').get(videoController.VideoConverter);
router.route('/video-proc/OPTIONSVideoRequest/:filename').options(videoController.VideoPlayOPTIONS);

router.route('/template-hls/:filename').get(videoController.VideoTemplateHLSStreaming, (req, res, next) => {
  console.log('template');
  console.log(req.filename);
  res.writeHead(200, {
    'Content-type': 'text/html',
  });
  const output = tempHls.replace(/{%FILENAME%}/g, req.filename);

  res.end(output);
  return;
});

module.exports = router;
