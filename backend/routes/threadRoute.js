const express = require('express');
const threadController = require('../controllers/threadController');
const authController = require('../controllers/authController');
const router = express.Router();
const upload = require('../modules/multerAPI.js');

//router.param('slug', threadController.CheckSlug);

//ROUTE HANDLER
router
  .route('/')
  .get(threadController.GetAllThreads)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'content-creator'),
    threadController.CheckInput,
    threadController.CreateNewThread
  );

router.route('/upload-video').post(upload, threadController.GetVideoThumbnail, threadController.UploadNewFile);

router
  .route('/:slug/comment')
  .get(threadController.CheckSlug, threadController.GetAllComments)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'content-creator', 'user'),
    threadController.CheckSlug,
    threadController.CreateNewComment
  );

router
  .route('/:slug/:n?')
  .get(threadController.CheckSlug, threadController.GetThread)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'content-creator'),
    threadController.CheckSlug,
    threadController.UpdateThread
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'content-creator'),
    threadController.CheckSlug,
    threadController.DeleteThread
  );

module.exports = router;
