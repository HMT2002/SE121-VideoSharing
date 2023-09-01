const express = require('express');
const fs = require('fs');
const lessonController = require('../controllers/lessonController');

const { upload, uploadVideo, uploadImage } = require('../modules/multerAPI.js');
const router = express.Router();
const tempHls = fs.readFileSync('./public/client.html', 'utf-8');

//ROUTE HANDLER
router.route('/').get(uploadVideo, lessonController.UploadNewFileDrive);
router.route('/').post(uploadVideo, lessonController.UploadNewFileFirebase);
router.route('/').update(lessonController.FFmpeg);
router.route('/').delete(lessonController.VideoStreamingFile);


module.exports = router;
