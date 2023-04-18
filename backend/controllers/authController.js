const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const User = require('./../models/mongo/User');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const driveAPI = require('../modules/driveAPI');
const imgurAPI = require('../modules/imgurAPI');
const cloudinary = require('../modules/cloudinaryAPI');

const SignToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};

exports.SignUp = catchAsync(async (req, res, next) => {
  console.log(req.body);

  const { account, password, passwordConfirm, email, username, role } = req.body;

  //console.log(photo);

  // const cloudinaryData = await cloudinary(req.body.photo);

  // console.log(cloudinaryData);

  if (!account || !password || !passwordConfirm || !email || !username) {
    next(new AppError('Please provide full information for sign up.', 400));
  }

  const photo = await imgurAPI({ image: fs.createReadStream(req.file.path), type: 'stream' });
  const newUser = await User.create({
    account: account,
    password: password,
    passwordConfirm: passwordConfirm,
    email: email,
    username: username,
    passwordChangedAt: Date.now(),
    role: role,
    photo: { link: photo.link },
  });

  const token = SignToken(newUser._id);

  fs.unlinkSync(req.file.path, function (err) {
    if (err) throw err;
    console.log(req.file.path + ' deleted!');
  });
  res.status(201).json({
    status: 'success create new user',
    token: token,
    data: {
      user: newUser,
    },
  });
});
exports.SignIn = catchAsync(async (req, res, next) => {
  console.log(req.body);

  const { account, password } = req.body;
  if (!account || !password) {
    return next(new AppError('Please provide account and password.', 400));
  }
  const user = await User.findOne({ account: account }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Wrong information.', 401));
  }

  const token = SignToken(user._id);
  res.status(200).json({
    status: 'success sign in',
    token: token,
    role: user.role || 'guest',
  });
});
exports.SignOut = catchAsync(async () => {
  console.log(req.body);
  res.status(201).json({
    status: 'User sign out!',
    data: {
      user: req.body,
    },
  });
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

exports.Check = catchAsync(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    status: 'ok',
    message: 'user token is fine',
    user: req.user,
    role: req.user.role,
  });
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    //roles ['admin','content-creator']. role='guest'

    if (!roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }
    next();
  };
};

exports.Forget = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const { account } = req.body;
  if (!account) {
    return next(new AppError('Please provide account to reset password', 400));
  }
  const user = await User.findOne({ account: account });

  if (!user) {
    return next(new AppError('Check input, no user', 401));
  }

  const token = SignToken(user._id);
  res.status(200).json({
    status: 'succeed ',
    message: 'Recover mail sent!',
  });
});
