const fs = require('fs');
const path = require('path');
const moment = require('moment');

const Thread = require('../models/mongo/Thread');
const User = require('../models/mongo/User');
const Comment = require('../models/mongo/Comment');
const Like = require('../models/mongo/Like');

const driveAPI = require('../modules/driveAPI');
const helperAPI = require('../modules/helperAPI');
const imgurAPI = require('../modules/imgurAPI');

const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.CheckNotification = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'check notification',
    // result: threads.length,
    // requestTime: req.requestTime,
  });
});

exports.CreateNotification = catchAsync(async (req, res, next) => {
console.log('create notification')
});
