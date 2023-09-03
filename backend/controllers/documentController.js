const fs = require('fs');
const path = require('path');
const users = JSON.parse(fs.readFileSync('./json-resources/users.json'));
const helperAPI = require('../modules/helperAPI');
const driveAPI = require('../modules/driveAPI');
const firebaseAPI = require('../modules/firebaseAPI');

const threads_test = JSON.parse(fs.readFileSync('./json-resources/threads_test.json'));

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

const { exec, execFileSync, spawn } = require('child_process');

const fluentFfmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
fluentFfmpeg.setFfmpegPath(ffmpegPath);

var bat = require.resolve('../videos/ffmpeg_batch.bat');

exports.GetAll = catchAsync(async (req, res) => {

  res.status(200).json({
    status: 200,
    // result: threads.length,
    // requestTime: req.requestTime,
  });
});

exports.Get = catchAsync(async (req, res) => {

  res.status(200).json({
    status: 200,
    // result: threads.length,
    // requestTime: req.requestTime,
  });
});

exports.Create = catchAsync(async (req, res) => {

  res.status(200).json({
    status: 200,
    // result: threads.length,
    // requestTime: req.requestTime,
  });
});

exports.Update = catchAsync(async (req, res) => {

  res.status(200).json({
    status: 200,
    // result: threads.length,
    // requestTime: req.requestTime,
  });
});

exports.Delete = catchAsync(async (req, res) => {

  res.status(200).json({
    status: 200,
    // result: threads.length,
    // requestTime: req.requestTime,
  });
});
