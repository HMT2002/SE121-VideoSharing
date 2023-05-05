const fs = require('fs');

const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const User = require('./../models/mongo/User');
const UpgradeReq = require('./../models/mongo/UpgradeReq');

const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const driveAPI = require('../modules/driveAPI');
const imgurAPI = require('../modules/imgurAPI');
const cloudinary = require('../modules/cloudinaryAPI');
const mailingAPI = require('../modules/mailingAPI');

exports.CheckID = catchAsync(async (req, res, next) => {
  if (user === undefined || !user) {
    return res.status(401).json({
      status: 'failed',
      message: 'invalid ID',
    });
  }
  next();
});

exports.CheckInput = catchAsync(async (req, res, next) => {
  var isInvalid = false;

  if (!req.body) {
    isInvalid = true;
  }

  if (isInvalid) {
    return res.status(400).json({
      status: 'failed',
      message: 'bad request',
    });
  }
  next();
});

exports.protect = catchAsync(async (req, res, next) => {
  //1) Getting token and check if it's there

  console.log('protect');
  console.log(req.headers.authorization);
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // if (token === undefined) {
  //   return next(new AppError('You are not login', 401));
  // }
  //2) Validate token

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  console.log(decoded);
  //3) Check if user is existed

  const currentUser = await User.findById(decoded.id);
  //console.log(currentUser);

  if (!currentUser) {
    return next(new AppError('User no longer existed', 401));
  }
  //4) Check if user change password after JWT was issued

  if (currentUser.changePasswordAfter(decoded.iat)) {
    return next(new AppError('User recently changed password. Please login again'));
  }

  // Access to protected route
  req.user = currentUser;
  next();
});

exports.GetUser = catchAsync(async (req, res, next) => {
  console.log(req.params);
  const account = req.params.account;

  const user = await User.findOne({ account: account });
  if (user === undefined || !user) {
    return next(new AppError('No user found!', 404));
  }

  if (!(user.account === req.user.account || req.user.role === 'admin')) {
    return next(new AppError('You are not the admin or owner of this account!', 401));
  }

  res.status(500).json({
    status: 'success',
    data: user,
  });
});

exports.UpdateUser = catchAsync(async (req, res, next) => {
  console.log(req.params);
  const account = req.params.account;

  const user = await User.findOne({ account: account });
  if (user === undefined || !user) {
    return next(new AppError('No user found!', 404));
  }

  if (!(user.account === req.user.account || req.user.role === 'admin')) {
    return next(new AppError('You are not the admin or owner of this account!', 401));
  }

  user.username = req.body.username;
  user.email = req.body.email;
  user.role = req.body.role;
  user.photo = req.body.photo;
  await user.save({ validateBeforeSave: false });

  res.status(201).json({
    status: 'success',
    data: user,
    message: 'success update user',
  });
});

exports.DeleteUser = catchAsync(async (req, res, next) => {
  console.log(req.params);
  const account = req.params.account;
  const user = await User.findOne({ account: account });

  if (user === undefined || !user) {
    return next(new AppError('No user found!', 404));
  }

  if (!(user.account === req.user.account || req.user.role === 'admin')) {
    return next(new AppError('You are not the admin or owner of this account!', 401));
  }

  await user.deleteOne();
  res.status(204).json({
    status: 'success delete',
  });
});

exports.UpgradeUser = catchAsync(async (req, res, next) => {
  console.log(req.params);
  const account = req.params.account;

  const user = await User.findOne({ account: account });
  if (user === undefined || !user) {
    return next(new AppError('No user found!', 404));
  }

  user.role = req.body.role;
  user.birthday = req.body.birthday;
  user.address = req.body.address;
  user.phone = req.body.phone;
  user.living_city = req.body.living_city;
  await user.save({ validateBeforeSave: false });


  const upgradeReq = await UpgradeReq.create({user:user,admin:req.user,message:req.body.message});

  res.status(201).json({
    status: 'success',
    message: 'success upgrade user',
    upgradeReq: upgradeReq,
  });
});

exports.GetAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find({});

  res.status(200).json({
    status: 'success get all user',
    data: users,
    requestTime: req.requestTime,
    message: 'Here is all the users!',
  });
});

exports.UploadImage = catchAsync(async (req, res, next) => {
  let photo = { link: 'https://i.imgur.com/KNJnIR0.jpg' };

  if (!req.file) {
  } else {
    photo = await imgurAPI({ image: fs.createReadStream(req.file.path), type: 'stream' });
  }

  if (req.file) {
    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path, function (err) {
        if (err) throw err;
        console.log(req.file.path + ' deleted!');
      });
    } else {
    }
  }

  res.status(201).json({
    status: 'success upload image',
    data: photo.link,
  });
});
