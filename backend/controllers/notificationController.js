const fs = require('fs');
const path = require('path');
const moment = require('moment');

const Thread = require('../models/mongo/Thread');
const User = require('../models/mongo/User');
const Comment = require('../models/mongo/Comment');
const Like = require('../models/mongo/Like');
const Notification = require('../models/mongo/Notification');


const driveAPI = require('../modules/driveAPI');
const helperAPI = require('../modules/helperAPI');
const imgurAPI = require('../modules/imgurAPI');

const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.CheckNotification = catchAsync(async (req, res, next) => {

  // req.query.populateObjects = 'receiver,sender,thread';
  req.query.fields = 'sender,receiver,message,thread,notitype,createDate';
  const features = new APIFeatures(Notification.find({ receiver: req.user,checked:false }).populate('receiver','username').populate('sender','username').populate('thread','title'), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populateObjects()
    .category()
    .timeline();
  const notifies = await features.query;

  await Notification.updateMany({ receiver: req.user,checked:false }, { $set: { checked: true } });

  res.status(200).json({
    status: 'check notification',
    result: notifies,
    requestTime: req.requestTime,
  });
});

exports.CreateNotification = catchAsync(async (req, res, next) => {
console.log('create notification')
});
