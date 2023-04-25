const express = require('express');
const threadController = require('../controllers/threadController');
const authController = require('../controllers/authController');
const router = express.Router();
const { upload, uploadVideo } = require('../modules/multerAPI.js');

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

router.route('/top-5-popular').get(threadController.aliasTop5Threads, threadController.GetAllThreads);

router.route('/upload-video').post(uploadVideo, threadController.GetVideoThumbnail, threadController.UploadNewFile);

router.route('/comments/ext').get(threadController.GetAllComments);

router
  .route('/comments/ext/:id')
  .get(threadController.GetComment)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'content-creator', 'user'),
    threadController.UpdateComment
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'content-creator', 'user'),
    threadController.DeleteComment
  );

router
  .route('/:slug/comment')
  .get(threadController.CheckSlug, threadController.GetAllCommentsFromThread)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'content-creator', 'user'),
    threadController.CheckSlug,
    threadController.CreateNewComment
  );

router
  .route('/:slug/like')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'content-creator', 'user'),
    threadController.CheckSlug,
    threadController.UserLikePost
  );

router.route('/:slug/like-count').get(threadController.CheckSlug, threadController.GetPostLikeCount);

router
  .route('/:slug')
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'content-creator'),
    threadController.CheckSlug,
    threadController.UpdateThread
  );

router
  .route('/:slug')
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'content-creator'),
    threadController.CheckSlug,
    threadController.DeleteThread
  );
router.route('/:slug/:n?').get(threadController.CheckSlug, threadController.GetThread);

module.exports = router;
