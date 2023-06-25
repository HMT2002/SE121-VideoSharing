const fs = require('fs');

const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const User = require('./../models/mongo/User');
const UpgradeReq = require('./../models/mongo/UpgradeReq');
const UpgradeLog = require('./../models/mongo/UpgradeLog');

const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');

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

  req.query.fields = 'account, createdDate, lastUpdated, username, email, photo, role, phone, birthday, address';

  const features = new APIFeatures(User.findOne({ account: account }), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populateObjects()
    .category()
    .timeline();
  const user = await features.query;

  if (user === undefined || !user || !user[0]) {
    return next(new AppError('No user found!', 404));
  }

  if (!(user[0].account === req.user.account || req.user.role === 'admin')) {
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

  const user = await User.findOne({ account: account }).select('+password');
  if (user === undefined || !user) {
    return next(new AppError('No user found!', 404));
  }

  if (!(user.account === req.user.account || req.user.role === 'admin')) {
    return next(new AppError('You are not the admin or owner of this account!', 401));
  }

  if (req.body.password != null) {
    if (!(await user.correctPassword(req.body.oldPassword, user.password))) {
      res.status(201).json({ status: 'incorrect old password' }); return;
    }
    else {
      user.password = req.body.password;
    }
  }

  user.username = req.body.username ? req.body.username : user.username;
  user.email = req.body.email ? req.body.email : user.email;
  user.photo = req.body.photo ? req.body.photo : user.photo;
  user.phone = req.body.phone ? req.body.phone : user.phone;
  user.birthday = req.body.birthday ? req.body.birthday : user.birthday;
  user.address = req.body.address ? req.body.address : user.address;
  user.lastUpdated = Date.now();
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

exports.GetUpgradeReq = catchAsync(async (req, res, next) => {
  const account = req.params.account;
  const user = await User.findOne({ account: account });

  if (user === undefined || !user) {
    res.status(404).json({ status: "404 user not found" }); return;
  }

  const upgradeReq = await UpgradeReq.find({ user: user._id });

  if (upgradeReq === undefined || !upgradeReq) {
    res.status(404).json({ status: '404 request not found' }); return;
  }

  res.status(200).json({
    status: 'success',
    data: upgradeReq
  });
});

exports.GetAllUpgradeReq = catchAsync(async (req, res, next) => {
  const unaccepted_req = await UpgradeReq.find({ accepted: false });
  const accepted_req = await UpgradeReq.find({ accepted: true });

  res.status(200).json({
    status: 'success get all request',
    data: {
      unaccepted_req,
      accepted_req,
    },
  });
});

exports.UpgradeUserReq = catchAsync(async (req, res, next) => {
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
  // user.living_city = req.body.living_city;
  await user.save({ validateBeforeSave: false });

  const upgradeReq = await UpgradeReq.create({
    user: user,
    message: req.body.message != null ? req.body.message : "pending request"
  });

  res.status(201).json({
    status: 'success',
    message: 'success request upgrade',
    upgradeReq: upgradeReq,
  });
});

exports.AcceptUpgradeReq = catchAsync(async (req, res, next) => {
  // console.log(req.params);
  // const account = req.params.account;

  // if (user === undefined || !user) {
  //   return next(new AppError('No user found!', 404));
  // }

  // const upgradeReq = await UpgradeReq.findOne({ user: user });
  // console.log(upgradeReq);
  // if (upgradeReq === undefined || !upgradeReq) {
  //   return next(new AppError('No upgrade request found!', 404));
  // }

  try {
    const user = await User.findById(req.user._id);
    const upgradeReq = await UpgradeReq.findById(req.body.upgradeReq._id);

    if (user == null) {
      res.status(404).json({
        status: 'failed',
        message: 'user not found'
      });
      return;
    }

    if (upgradeReq == null) {
      res.status(404).json({
        status: 'failed',
        message: 'upgrade request not found'
      });
      return;
    }

    await UpgradeLog.create({
      admin: req.user,
      upgradeReq: req.body.upgradeReq,
      accepted: true
    });

    user.role = 'content-creator';
    await user.save({ validateBeforeSave: false });

    upgradeReq.accepted = true;
    await upgradeReq.save({ validateBeforeSave: false });

    res.status(200).json({
      status: 'success',
      message: 'success upgrade user',
      role: user.role,
    });
  } catch (error) {
    console.log(error);
  }
});


// exports.AcceptUpgradeReq = catchAsync(async (req, res, next) => {
//   console.log(req.params);
//   const account = req.params.account;

//   const user = await User.findOne({ account: account });
//   if (user === undefined || !user) {
//     return next(new AppError('No user found!', 404));
//   }

//   const upgradeReq = await UpgradeReq.findOne({ user: user });
//   console.log(upgradeReq);
//   if (upgradeReq === undefined || !upgradeReq) {
//     return next(new AppError('No upgrade request found!', 404));
//   }

//   user.role = 'content-creator';
//   await user.save({ validateBeforeSave: false });

//   res.status(201).json({
//     status: 'success',
//     message: 'success upgrade user',
//     role: user.role,
//   });
// });

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

  console.log(req.file);

  if (!req.file) {
    console.log("req body not found");
  } else {
    photo = await imgurAPI({ image: fs.createReadStream(req.file.path), type: 'stream' });
    console.log(photo);
  }

  if (req.body) {
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
