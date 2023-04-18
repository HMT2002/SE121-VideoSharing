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

exports.GetUser = (req, res) => {
  console.log(req.params);
  const id = req.params.id;

  const user = users.find((el) => el._id.$oid === id);

  if (user === undefined || !user) {
    return res.status(401).json({
      status: 'failed',
      message: 'invalid ID',
    });
  }
  res.status(500).json({
    status: 'failed',
    result: users.length,
    requestTime: req.requestTime,
    message: 'not yet finsihed',
  });
};

exports.UpdateUser = (req, res) => {
  console.log(req.params);
  const id = req.params.id;
  res.status(500).json({
    status: 'failed',
    result: users.length,
    requestTime: req.requestTime,
    message: 'not yet finsihed',
  });
};

exports.DeleteUser = (req, res) => {
  console.log(req.params);
  const id = req.params.id;

  res.status(500).json({
    status: 'failed',
    result: users.length,
    requestTime: req.requestTime,
    message: 'not yet finsihed',
  });
};

exports.GetAllUsers = (req, res) => {
  res.status(500).json({
    status: 'failed',
    result: users.length,
    requestTime: req.requestTime,
    message: 'not yet finsihed',
  });
};

exports.CreateNewUser = (req, res) => {
  console.log(req.params);

  var numberID = users.length + 1;
  const newID = 'users_' + numberID;
  const newUser = Object.assign({ _id: newID }, req.body);

  users.push(newUser);
  fs.writeFile('./json-resources/userss.json', JSON.stringify(users), (err) => {
    res.status(201).json({
      status: 'success create',
    });
  });

  res.status(500).json({
    status: 'failed',
    result: users.length,
    requestTime: req.requestTime,
    message: 'not yet finsihed',
  });
};
