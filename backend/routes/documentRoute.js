const express = require('express');
const fs = require('fs');
const documentController = require('../controllers/documentController');

const { upload, uploadVideo, uploadImage } = require('../modules/multerAPI.js');
const router = express.Router();
const tempHls = fs.readFileSync('./public/client.html', 'utf-8');

//ROUTE HANDLER
router.route('/').get(uploadVideo, documentController.UploadNewFileDrive);
router.route('/').post(uploadVideo, documentController.UploadNewFileFirebase);
router.route('/').update(documentController.FFmpeg);
router.route('/').delete(documentController.VideoStreamingFile);

module.exports = router;
