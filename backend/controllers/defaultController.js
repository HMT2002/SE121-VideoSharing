const Thread = require('../models/mongo/Thread');
const catchAsync = require('./../utils/catchAsync');
exports.Default = catchAsync(async (req, res, next) => {
  const threads = await Thread.find({});
  console.log(threads);
  res.status(200).json({
    status: 'success',
    requestTime: req.requestTime,
    data: {
      threads: threads,
    },
  });
});
