const express = require('express');
const signController = require('../controllers/signController');
const authController = require('../controllers/authController');

const router = express.Router();

router.param('id', signController.CheckID);

//ROUTE HANDLER
router.route('/').post(signController.CheckID, signController.CheckInput, signController.SignIn);
router.route('/up').post(signController.CheckID, signController.CheckInput, signController.SignUp);
router.route('/out').post(signController.CheckID, signController.CheckInput, signController.SignOut);

module.exports = router;
