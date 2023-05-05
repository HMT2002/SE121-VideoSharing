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
  .route('/:account/upgrade')
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    userController.CheckInput,
    userController.UpgradeUser
  );

module.exports = router;
