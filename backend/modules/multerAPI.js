const multer = require('multer');

const storage = multer.diskStorage({
  destination: 'resources-storage/uploads/',
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, file.originalname);
  },
});
const maxSize = 300 * 1024 * 1024; //300mb
const maxSizeVideo = 300 * 1024 * 1024; //300mb
const maxSizeImage = 10 * 1024 * 1024; //10mb

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg' ||
      file.mimetype == 'video/mp4' ||
      file.mimetype == 'video/mkv' ||
      file.mimetype == 'image/gif' ||
      file.mimetype == 'video/x-msvideo'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg, .jpeg, .gif, .mkv, .avi format allowed!'));
    }
  },
  limits: { fileSize: maxSize },
}).single('myFile');

// var Upload = upload.any([{ name: 'TenFieldsORouteVaHbsPhaiGiongNhau' }]);

const uploadVideo = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == 'video/mp4' || file.mimetype == 'video/mkv' || file.mimetype == 'video/x-msvideo') {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .mkv, .avi format allowed!'));
    }
  },
  limits: { fileSize: maxSizeVideo },
}).single('myFile');

const uploadImage = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg, .jpeg format allowed!'));
    }
  },
  limits: { fileSize: maxSizeImage },
}).single('myFile');

module.exports = { upload, uploadVideo, uploadImage };
