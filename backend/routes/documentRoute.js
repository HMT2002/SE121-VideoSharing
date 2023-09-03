const express = require('express');
const fs = require('fs');
const documentController = require('../controllers/documentController');

const { upload, uploadVideo, uploadImage } = require('../modules/multerAPI.js');
const router = express.Router();
const tempHls = fs.readFileSync('./public/client.html', 'utf-8');

//ROUTE HANDLER
router.route('/').get( documentController.Get);
router.route('/get-all').get( documentController.GetAll);

router.route('/').post(uploadVideo, documentController.Create);
router.route('/').patch(documentController.Update);
router.route('/').delete(documentController.Delete);

module.exports = router;
