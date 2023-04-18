const AppError = require('../utils/appError');

const handleValidationError = () =>
  new AppError('There something wrong with the data you sent, please check again', 400);
const handleJWTValidationError = () => new AppError('You are not login', 401);
const sendErrorProd = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: 'There something wrong!',
  });
};
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // console.log('Err in error controller ');
  // console.log(err.message);

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else {
    let error = { ...err };
    // console.log('Error in error controller ');
    // console.log(error.name);
    // if (error.name === 'CastError') error = handleCastErrorDB(error);
    // if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError') error = handleValidationError();
    if (error.name === 'JsonWebTokenError') error = handleJWTValidationError();

    sendErrorProd(error, res);
  }
};
