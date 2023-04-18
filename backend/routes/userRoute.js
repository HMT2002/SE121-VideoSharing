const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const upload = require('../modules/multerAPI.js');

const router = express.Router();

router.param('id', userController.CheckID);

router.post('/signup', upload, authController.SignUp);
router.post('/signin', authController.SignIn);
router.post('/signout', authController.SignOut);

//ROUTE HANDLER
router.route('/').get(userController.GetAllUsers).post(userController.CheckInput, userController.CreateNewUser);
router.route('/:id/:n?').get(userController.GetUser).patch(userController.UpdateUser).delete(userController.DeleteUser);

module.exports = router;
