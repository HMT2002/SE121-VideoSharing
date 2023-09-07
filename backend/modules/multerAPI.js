const multer = require('multer');

const storage = multer.diskStorage({
  destination: 'resources-storage/uploads/',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const storageChunk = multer.diskStorage({
  destination: 'resources-storage/uploads/',
  filename: (req, file, cb) => {
    cb(null, req.headers.chunkname);
  },
});
const mutilpartMaxSize = 40 * 1024 * 1024; //30mb
const maxSize = 300 * 1024 * 1024; //300mb
const maxSizeVideo = 300 * 1024 * 1024; //300mb
const maxSizeImage = 15 * 1024 * 1024; //10mb

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

const uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single('myFile');

const uploadMultipartFile = multer({
  storage: storage,
  limits: { fileSize: mutilpartMaxSize },
}).single('myMultilPartFile');


const uploadMultipartFileChunk = multer({
  storage: storageChunk,
  limits: { fileSize: mutilpartMaxSize },
}).single('myMultilPartFileChunk');

const uploadArrayFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).any('myFiles',10);


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

const uploadArrayVideo = multer({
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
}).array('myFiles',5);

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

const uploadArrayImage = multer({
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
}).array('myFiles',10);

module.exports = { upload, uploadVideo, uploadImage, uploadArrayFile,uploadFile,uploadArrayImage,uploadArrayVideo,uploadMultipartFile,uploadMultipartFileChunk };
