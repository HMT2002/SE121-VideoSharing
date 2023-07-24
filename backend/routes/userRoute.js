const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { uploadImage } = require('../modules/multerAPI.js');

const router = express.Router();

router.param('id', userController.CheckID);

router.post('/signup', authController.SignUp);
router.post('/signin', authController.SignIn);
router.post('/signup-google', authController.SignUpGoogle);
router.post('/signin-google', authController.SignInGoogle);
router.post('/signout', authController.SignOut);
router.post('/upload-image', uploadImage, userController.UploadImage);

//ROUTE HANDLER
router.route('/').get(authController.protect, authController.restrictTo('admin'), userController.GetAllUsers);
//   .post(userController.CheckInput, uploadImage, authController.SignUp);

router
.route('/all-upgrade-request')
.get(
  authController.protect,
  authController.restrictTo('admin'),
  userController.GetAllUpgradeRequest
);
router
.route('/get-upgrade-request/')
.get(
  authController.protect,
  authController.restrictTo('user','content-creator'),
  userController.GetUserUpgradeRequest
);

router
.route('/get-upgrade-request/:account')
.get(
  authController.protect,
  authController.restrictTo('admin','user','content-creator'),
  userController.GetUserUpgradeRequestByAccount
);
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
    userController.UpgradeReqUser
  );

  router
  .route('/:account/accept-upgrade')
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    userController.CheckInput,
    userController.AcceptUpgradeReq
  );

module.exports = router;
