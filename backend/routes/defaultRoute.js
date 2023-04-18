const express = require('express');
const defaultController = require('../controllers/defaultController');
const authController = require('../controllers/authController');

const router = express.Router();

//ROUTE HANDLER
router.route('/').get(defaultController.Default);
router.route('/forget-password').post(authController.Forget);

module.exports = router;
