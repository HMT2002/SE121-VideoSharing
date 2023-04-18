const express = require('express');
const testController = require('../controllers/testController');
const threadController = require('../controllers/threadController');
const signController = require('../controllers/signController');
const userController = require('../controllers/userController');
const upload = require('../modules/multerAPI.js');

const router = express.Router();

router.param('id', signController.CheckID);

//ROUTE HANDLER
router.route('/').post(signController.CheckID, signController.CheckInput, signController.SignUp);

router.route('/upload-video').post(upload, testController.UploadNewFile);
router.route('/threads').get(testController.GetAllThreads).post(testController.CreateNewThread);
router.route('/ffmpeg').post(testController.FFmpeg);

router.route('/:id').post(signController.CheckID, signController.CheckInput, signController.SignIn);
router.route('/:id/out').post(signController.CheckID, signController.CheckInput, signController.SignOut);

module.exports = router;
