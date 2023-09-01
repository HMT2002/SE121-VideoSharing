const express = require('express');
const fs = require('fs');
const educationController = require('../controllers/educationController');

const { upload, uploadVideo, uploadImage } = require('../modules/multerAPI.js');
const router = express.Router();
const tempHls = fs.readFileSync('./public/client.html', 'utf-8');

//ROUTE HANDLER
router.route('/').get(uploadVideo, educationController.UploadNewFileDrive);
router.route('/').post(uploadVideo, educationController.UploadNewFileFirebase);
router.route('/').update(educationController.FFmpeg);
router.route('/').delete(educationController.VideoStreamingFile);


module.exports = router;
