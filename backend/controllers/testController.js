const fs = require('fs');
const path = require('path');
const users = JSON.parse(fs.readFileSync('./json-resources/users.json'));
const helperAPI = require('../modules/helperAPI');
const driveAPI = require('../modules/driveAPI');
const threads_test = JSON.parse(fs.readFileSync('./json-resources/threads_test.json'));

const fluentFfmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
fluentFfmpeg.setFfmpegPath(ffmpegPath);


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

exports.UploadNewFile = async (req, res) => {
  //console.log(req);
  const file = req.file;

  // console.log(file);
  const fileID = helperAPI.GenerrateRandomString(15);

  const fileExtension = path.extname(file.path);
  // console.log(fileExtension);

  const driveFileName = fileID + fileExtension;
  // console.log(driveFileName);

  const GoogleDriveAPIFolerID = '1vb2ZGYvrqsz7Rrw3WErV91YxxpeL3Sxh';

  const videoMetaData = {
    name: driveFileName,
    parents: [GoogleDriveAPIFolerID],
  };
  const videoMedia = {
    mimeType: file.mimetype,
    body: fs.createReadStream(file.path),
  };

  const driveAPIResponse = await driveAPI(videoMetaData, videoMedia);

  const driveID = driveAPIResponse.data.id;
  fs.unlink(file.path, function (err) {
    if (err) throw err;
    console.log('File deleted!');
  });

  console.log(driveID);
  res.status(201).json({
    status: 'success upload',
    driveID: driveID,
  });
};



const Thread = require('../models/mongo/Thread');

exports.GetAllThreads = async (req, res) => {
  //console.log(threads_test);

  const threads = await Thread.find({});
  console.log(threads);
  res.status(200).json({
    status: 'success',
    result: threads_test.length,
    requestTime: req.requestTime,
    data: {
      threads: threads,
    },
  });
};

exports.FFmpeg = async (req, res) => {
  //console.log(threads_test);

  // const threads = await Thread.find({});
  // console.log(threads);

  res.status(200).json({
    status: 'success',
    requestTime: req.requestTime,
    data: {
      threads: 'FFmpeg data',
    },
  });
};

exports.CreateNewThread = async (req, res) => {
  console.log('api/test/threads ');
  console.log(req.body);

  const newThreadMongo = new Thread(req.body);

  const response_data = await newThreadMongo
    .save()
    .then((doc) => {
      console.log(doc);
      return doc;
    })
    .catch((err) => {
      console.log(err);
    });
  res.status(201).json({
    status: 'success create',
    data: response_data,
  });
};


exports.VideoStreaming=async(req,res,next)=>{
  const range=req.headers.range;
  console.log(range)
  if(!range){
    res.status(400).json({
      status: 'failed',
    });
    return;
  }

  const videoPath='videos/'+req.params.filename+".mp4";
  const videoSize=fs.statSync(videoPath).size;
  console.log(videoSize)

  const CHUNK_SIZE=10**6 // 1MB

  const start=Number(range.replace(/\D/g,""));
  const end=Math.min(start+CHUNK_SIZE,videoSize-1);

  const contentLength=end-start+1;
  const headers={
    "Content-Range":`bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges":"bytes",
    "Content-Length":contentLength,
    "Content-Type":"video/mp4",
  }

  res.writeHead(206,headers);


  const videoStream=fs.createReadStream(videoPath,{start,end});
  videoStream.pipe(res);

  //   res.status(206).json({
  //   status: 'done',
  // });

}