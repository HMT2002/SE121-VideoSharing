const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { uploadImage } = require('../modules/multerAPI.js');

const router = express.Router();

router.param('id', userController.CheckID);

router.post('/signup', uploadImage, authController.SignUp);
router.post('/signin', authController.SignIn);
router.post('/signout', authController.SignOut);
router.post('/upload-image', uploadImage, userController.UploadImage);

//ROUTE HANDLER
router.route('/').get(authController.protect, authController.restrictTo('admin'), userController.GetAllUsers);
//   .post(userController.CheckInput, uploadImage, authController.SignUp);
router
  .route('/:account')
  .get(authController.protect, authController.restrictTo('admin', 'content-creator', 'user'), userController.GetUser)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'content-creator', 'user'),
    userController.CheckInput,
    userController.UpdateUser
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'content-creator', 'user'),
    userController.DeleteUser
  );

router
  .route('/id/:userId')
  .get(userController.GetUserById);


router
  .route('/:account/request-upgrade')
  .post(
    authController.protect,
    authController.restrictTo('user'),
    userController.CheckInput,
    userController.UpgradeUserReq
  );

router
  .route('/:account/accept-upgrade')
  .post(
    authController.protect,
    authController.restrictTo('admin', 'user'),
    userController.CheckInput,
    userController.AcceptUpgradeReq
  );

router
  .route('/get-upgrade-request/:account')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'content-creator', 'user'),
    userController.CheckInput,
    userController.GetUpgradeReq
  );

router
  .route('/all-upgrade-request')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    userController.GetAllUpgradeReq
  );

module.exports = router;
