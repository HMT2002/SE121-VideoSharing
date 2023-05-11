const express = require('express');
const threadController = require('../controllers/threadController');
const notificationController = require('../controllers/notificationController');

const authController = require('../controllers/authController');
const { upload, uploadVideo } = require('../modules/multerAPI.js');

const router = express.Router();

//router.param('slug', threadController.CheckSlug);

//ROUTE HANDLER
router
  .route('/check-noti')
  .get(authController.protect,
    authController.restrictTo('admin', 'content-creator','user'),notificationController.CheckNotification);


module.exports = router;
