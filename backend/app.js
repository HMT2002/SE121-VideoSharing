'use strict';
const express = require('express');
const morgan = require('morgan');
const app = express();
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const cors = require('cors');
var path = require('path');
const fs = require('fs');

// const client_posts = JSON.parse(fs.readFileSync('./json-resources/client_posts.json'));

//MIDDLEWARE
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
}
console.log(process.env.NODE_ENV);
app.use(express.json());
app.use(express.static('public'));

app.use(cors());

app.use((req, res, next) => {
  // res.setHeader('Access-Control-Allow-Origin', '*');
  // res.setHeader('Access-Control-Allow-Credentials', 'true');
  // res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  // res.setHeader(
  //   'Access-Control-Allow-Headers',
  //   'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
  // );

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
//http://localhost:9000/videos/convert/無意識.m3u8
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.requestTime);
  //console.log(req.headers);
  req.url = decodeURIComponent(req.url);

  next();
});

app.get('/*.vtt', (req, res, next) => {
  console.log('vtt is here');
  console.log(req.url);
  // console.log(req);
  if (fs.existsSync(__dirname+req.url)) {
        console.log('vtt is exist')
     const stream=fs.createReadStream(__dirname+req.url);
     res.writeHead(206);
     stream.pipe(res)
  } else {
    console.log('vtt is not exist')
  }

  
});

//ROUTES
const defaultRoute = require('./routes/defaultRoute');
const threadRouter = require('./routes/threadRoute');
const userRouter = require('./routes/userRoute');
const authRouter = require('./routes/authRoute');
const notificationRouter = require('./routes/notificationRoute');

const testRoute = require('./routes/testRoute');

//app.use('/', defaultRoute);

app.use('/api/v1/', defaultRoute);
app.use('/api/v1/threads', threadRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/notification', notificationRouter);
app.use('/api/test', testRoute);

app.all('*', (req, res, next) => {
  next(new AppError('Cant find ' + req.originalUrl + ' on the server', 404));
});
app.use(globalErrorHandler);

module.exports = app;
