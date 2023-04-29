const express = require('express');
const testController = require('../controllers/testController');
const threadController = require('../controllers/threadController');
const userController = require('../controllers/userController');
const { upload, uploadVideo, uploadImage } = require('../modules/multerAPI.js');

const router = express.Router();

//ROUTE HANDLER

router.route('/upload-video').post(uploadVideo, testController.UploadNewFile);
router.route('/threads').get(testController.GetAllThreads).post(testController.CreateNewThread);
router.route('/ffmpeg').post(testController.FFmpeg);

module.exports = router;
