const express = require('express');
const fs=require('fs');
const testController = require('../controllers/testController');
const threadController = require('../controllers/threadController');
const userController = require('../controllers/userController');
const { upload, uploadVideo, uploadImage } = require('../modules/multerAPI.js');
const router = express.Router();
const tempHls = fs.readFileSync('./public/client.html', 'utf-8');

//ROUTE HANDLER

router.route('/upload-video').post(uploadVideo, testController.UploadNewFile);
router.route('/threads').get(testController.GetAllThreads).post(testController.CreateNewThread);
router.route('/ffmpeg').post(testController.FFmpeg);

router.route('/video-stream-file/:filename').get(testController.VideoStreamingFile);
router.route('/video-stream-hls/:filename').get(testController.VideoStreamingHLS);

router.route('/video-convert/test-phase-convert-video/:filename').get(testController.VideoConverter);


router.route('/template-hls/:filename').get(testController.VideoStreamingHLSNEXT,(req, res,next) => {

    console.log('template');
    console.log(req.filename)
    res.writeHead(200, {
        'Content-type': 'text/html',
      });
    const output = tempHls.replace(/{%FILENAME%}/g, req.filename);


      res.end(output);
    return ;
  });



module.exports = router;
