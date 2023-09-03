const express = require('express');
const fs = require('fs');
const lessonController = require('../controllers/lessonController');

const { upload, uploadVideo, uploadImage } = require('../modules/multerAPI.js');
const router = express.Router();
const tempHls = fs.readFileSync('./public/client.html', 'utf-8');

//ROUTE HANDLER
router.route('/').get( lessonController.Get);
router.route('/get-all').get( lessonController.GetAll);

router.route('/').post(uploadVideo, lessonController.Create);
router.route('/').patch(lessonController.Update);
router.route('/').delete(lessonController.Delete);


module.exports = router;
