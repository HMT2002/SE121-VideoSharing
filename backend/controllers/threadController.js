const fs = require('fs');
const path = require('path');
const moment = require('moment');

const Thread = require('../models/mongo/Thread');
const User = require('../models/mongo/User');
const Comment = require('../models/mongo/Comment');

const driveAPI = require('../modules/driveAPI');
const helperAPI = require('../modules/helperAPI');
const imgurAPI = require('../modules/imgurAPI');

const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const fluentFfmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
fluentFfmpeg.setFfmpegPath(ffmpegPath);

exports.CheckSlug = catchAsync(async (req, res, next) => {
  console.log('Slug value is: ' + req.params.slug);

  // let slug = req.params.slug;

  // slug = slug.trim();

  // // chuyển về dạng tổ hợp
  // slug = slug.normalize('NFD');
  // // xóa các ký tự dấu tổ hợp
  // slug = slug.replace(/[\u0300-\u036f]/g, '');
  // // chuyển chữ đ/Đ thành d/D
  // slug = slug.replace(/[đĐ]/g, (m) => (m === 'đ' ? 'd' : 'D'));

  // slug = slug.toLowerCase();
  // slug = slug.replace('-', '_');

  // slug = slug.replace(' ', '-');

  const thread = await Thread.findOne({ slug: req.params.slug }).populate('user');
  if (thread === undefined || !thread) {
    return next(new AppError('No thread found with that slug', 404));
  }
  req.thread = thread;

  next();
});

exports.CheckInput = (req, res, next) => {
  var isInvalid = false;

  if (!req.body) {
    isInvalid = true;
  }

  if (isInvalid) {
    return next(new AppError('Missing thread information'), 406);
  }
  next();
};

exports.aliasTop5Threads = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-createDate';
  // req.query.fields = 'createDate,title';
  req.query.populateObjects = 'user';
  req.query.timeline = Date.now();

  next();
};

exports.GetAllThreads = catchAsync(async (req, res) => {
  const features = new APIFeatures(Thread.find().populate('user'), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populateObjs()
    .category()
    .timeline();
  const threads = await features.query;

  //console.log(threads);
  res.status(200).json({
    status: 'success',
    result: threads.length,
    requestTime: req.requestTime,
    data: {
      threads: threads,
    },
  });
});

exports.UploadNewFile = catchAsync(async (req, res, next) => {
  //console.log(req);
  const file = req.file;

  // console.log(file);
  const fileID = helperAPI.GenerrateRandomString(15);

  const fileExtension = path.extname(file.path);
  // console.log(fileExtension);

  const driveFileName = fileID + fileExtension;
  // console.log(driveFileName);

  const GoogleDriveAPIFolerID = '1vb2ZGYvrqsz7Rrw3WErV91YxxpeL3Sxh';

  const videoMetaData = {
    name: driveFileName,
    parents: [GoogleDriveAPIFolerID],
  };
  const videoMedia = {
    mimeType: file.mimetype,
    body: fs.createReadStream(file.path),
  };

  const driveAPIResponse = await driveAPI(videoMetaData, videoMedia);

  if (!driveAPIResponse.data.id) {
    return next(new AppError('Somethings wrong with the server, cant upload file!', 503));
  }

  const driveID = driveAPIResponse.data.id;
  fs.unlink(file.path, function (err) {
    if (err) {
      console.log(err);
    }
    console.log('File deleted!');
  });

  console.log(driveID);
  console.log(req.thumbnail);
  res.status(201).json({
    status: 'success upload',
    driveID: driveID,
    thumbnail: req.thumbnail,
  });
});

exports.GetVideoThumbnail = catchAsync(async (req, res, next) => {
  //console.log(req);
  const file = req.file;
  // console.log(file);
  const filePath = file.path;

  const pictureID = helperAPI.GenerrateRandomString(7);

  console.log('Do ffmpeg shit');

  fluentFfmpeg(filePath)
    .on(
      'filenames',
      catchAsync(async (filenames) => {
        console.log('screenshots are ' + filenames.join(', '));
      })
    )
    .on('end', async function () {
      console.log('Screenshots taken');
      const filename = 'resources-storage/uploads/thumbnail_' + pictureID + '.png';
      if (fs.existsSync(filename)) {
        console.log('yuyuko exist');
        const photo = await imgurAPI({ image: fs.createReadStream(filename), type: 'stream' });

        req.thumbnail = photo.link || 'https://i.imgur.com/13KYZfX.jpg';

        fs.unlinkSync(filename, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log('thumbnail deleted!');
          }
        });
      } else {
        console.log('yuyuko is not exist');
        req.thumbnail = 'https://i.imgur.com/13KYZfX.jpg';
      }
      next();
    })
    .on('error', function (err) {
      console.error(err);
      req.thumbnail = 'https://i.imgur.com/13KYZfX.jpg';

      next();
    })
    .screenshots({
      timestamps: [helperAPI.GenerrateRandomNumberBetween(4, 9)],
      filename: 'thumbnail_' + pictureID + '.png',
      folder: 'resources-storage/uploads/',
      size: '320x240',
    });
});

exports.GetThread = catchAsync(async (req, res, next) => {
  // console.log(req.params);

  const thread = req.thread;
  if (thread === undefined || !thread) {
    return next(new AppError('No thread found!', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      thread: thread,
    },
  });
});

exports.CreateNewThread = catchAsync(async (req, res, next) => {
  console.log('api/v1/threads');
  //console.log(req.params);
  console.log(req.body);

  const user = req.user;
  const newThread = await Thread.create({ ...req.body, user: user });

  res.status(201).json({
    status: 'success create',
    data: newThread,
  });
});

exports.CreateNewComment = catchAsync(async (req, res, next) => {
  console.log('api/v1/threads/' + req.params.slug + '/comment');
  //console.log(req.body);

  const slug = req.params.slug;
  const thread = await Thread.findOne({ slug: slug });
  const user = req.user;
  const comment = { ...req.body, thread: thread, user: user };
  //console.log(comment);

  const newComment = await Comment.create(comment);
  //console.log(newComment);

  res.status(201).json({
    status: 'success comment!',
    data: newComment,
  });
});

exports.GetAllComments = catchAsync(async (req, res, next) => {
  console.log('api/v1/threads/comments/ext/');
  //console.log(req.body);

  //console.log(comment);

  const comments = await Comment.find({});
  //console.log(newComment);

  res.status(201).json({
    status: 'ok',
    data: comments,
  });
});

exports.GetComment = catchAsync(async (req, res, next) => {
  console.log('api/v1/threads/comments/ext/' + req.params.id);
  const id = req.params.id;

  const comment = await Comment.findOne({ _id: id });
  //console.log(newComment);

  res.status(201).json({
    status: 'ok',
    data: comment,
  });
});

exports.GetAllCommentsFromThread = catchAsync(async (req, res, next) => {
  console.log('api/v1/threads/' + req.params.slug + '/comment');
  //console.log(req.body);

  const slug = req.params.slug;
  const thread = await Thread.findOne({ slug: slug });
  //console.log(comment);

  const comments = await Comment.find({ thread: thread }).populate('user');
  //console.log(newComment);

  res.status(201).json({
    status: 'ok',
    data: comments,
  });
});

exports.UpdateThread = catchAsync(async (req, res, next) => {
  console.log(req.params);
  const slug = req.params.slug;

  console.log(req.body);
  const thread = await Thread.findOne({ slug: slug }).populate('user');
  if (thread === undefined || !thread) {
    return next(new AppError('No user found!', 404));
  }
  if (!(thread.user.account === req.user.account || req.user.role === 'admin')) {
    return next(new AppError('You are not the admin or the creator of this thread!', 401));
  }

  thread.content = req.body.content;
  thread.video = req.body.video;
  thread.title = req.body.title;
  thread.slug = req.body.slug;
  thread.tag = req.body.tag;
  thread.updateDate = Date.now();
  await thread.save();

  console.log(thread);

  res.status(201).json({
    status: 'success update',
    data: thread,
  });
});

exports.DeleteThread = catchAsync(async (req, res, next) => {
  console.log(req.params);
  const slug = req.params.slug;
  const thread = await Thread.findOne({ slug: slug }).populate('user');

  if (!(thread.user.account === req.user.account || req.user.role === 'admin')) {
    return next(new AppError('You are not the admin or the creator of this thread!', 401));
  }

  await thread.deleteOne();

  res.status(204).json({
    status: 'success delete',
  });
});

exports.UpdateComment = catchAsync(async (req, res, next) => {
  console.log('api/v1/threads/comments/ext/' + req.params.id);
  const id = req.params.id;

  const comment = await Comment.findOne({ _id: id }).populate('user');
  if (comment === undefined || !comment) {
    return next(new AppError('No user found!', 404));
  }
  if (!(comment.user.account === req.user.account)) {
    return next(new AppError('You are not the creator of this comment!', 401));
  }

  comment.content = req.body.content;

  await comment.save();

  console.log(comment);

  res.status(201).json({
    status: 'success update comment',
    data: comment,
  });
});

exports.DeleteComment = catchAsync(async (req, res, next) => {
  console.log('api/v1/threads/comments/ext/' + req.params.id);
  const id = req.params.id;

  const comment = await Comment.findOne({ _id: id }).populate('user');

  if (!(comment.user.account === req.user.account)) {
    return next(new AppError('You are not the creator of this comment!', 401));
  }

  await comment.deleteOne();

  res.status(204).json({
    status: 'success delete',
  });
});
