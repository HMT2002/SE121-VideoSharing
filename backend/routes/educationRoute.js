const express = require('express');
const fs = require('fs');
const educationController = require('../controllers/educationController');

const { upload, uploadVideo, uploadImage } = require('../modules/multerAPI.js');
const router = express.Router();
const tempHls = fs.readFileSync('./public/client.html', 'utf-8');

//ROUTE HANDLER
router.route('/').get( educationController.Get);
router.route('/get-all').get( educationController.GetAll);

router.route('/').post(uploadVideo, educationController.Create);
router.route('/').patch(educationController.Update);
router.route('/').delete(educationController.Delete);


module.exports = router;
