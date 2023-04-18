const fs = require('fs');
const users = JSON.parse(fs.readFileSync('./json-resources/users.json'));

exports.CheckID = (req, res, next, value) => {
  console.log('ID value is: ' + value);
  const user = users.find((el) => el._id.$oid === value);

  if (user === undefined || !user) {
    return res.status(401).json({
      status: 'failed',
      message: 'invalid ID',
    });
  }
  next();
};

exports.CheckInput = (req, res, next, value) => {
  console.log('ID value is: ' + value);
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
};
exports.SignUp = (req, res) => {
  console.log(req.params);
  const id = req.params.id;
  res.status(500).json({
    status: 'failed',
    requestTime: req.requestTime,
    message: 'not yet finsihed',
  });
};
exports.SignIn = (req, res) => {
  console.log(req.params);
  const id = req.params.id;
  res.status(500).json({
    status: 'failed',
    requestTime: req.requestTime,
    message: 'not yet finsihed',
  });
};
exports.SignOut = (req, res) => {
  console.log(req.params);
  const id = req.params.id;
  res.status(500).json({
    status: 'failed',
    requestTime: req.requestTime,
    message: 'not yet finsihed',
  });
};
