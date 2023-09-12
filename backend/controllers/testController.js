const fs = require('fs');
const path = require('path');
const users = JSON.parse(fs.readFileSync('./json-resources/users.json'));
const helperAPI = require('../modules/helperAPI');
const driveAPI = require('../modules/driveAPI');
const threads_test = JSON.parse(fs.readFileSync('./json-resources/threads_test.json'));

const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');

const { exec, execFileSync, spawn } = require('child_process');

const fluentFfmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
fluentFfmpeg.setFfmpegPath(ffmpegPath);

var bat = require.resolve('../videos/ffmpeg_batch.bat');

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

exports.UploadNewFileLarge = async (req, res) => {
  //console.log(req);
  const file = req.file;
  console.log(file);
  const fileExtension = path.extname(file.path);
  console.log(fileExtension);
  const videoMedia = {
    mimeType: file.mimetype,
    body: fs.createReadStream(file.path),
  };
  console.log(videoMedia);
  res.status(201).json({
    status: 'success upload',
    videoMedia,
  });
};

exports.UploadNewFileLargeMultilpart = catchAsync(async (req, res, next) => {
  console.log('Dealing with request');
  //console.log(req.headers);
  const file = req.file;
  console.log(file);
  const destination = req.file.destination;
  console.log(destination)
  //const fileExtension = path.extname(req.file.path);
  let arrayChunkName = req.body.arraychunkname.split(',');
  console.log(arrayChunkName);
  let flag = true;
  arrayChunkName.forEach((chunkName) => {
    if (!fs.existsSync(destination+chunkName)) {
      flag = false;
    }
  });
  let filename = req.headers.filename;
  let chunkname = req.headers.chunkname;
  if (flag) {
    console.log('file is completed');
    console.log(filename);
    res.status(201).json({
      message: 'success full upload',
      filename,
      destination,
      full: true,
    });
    return;
  }
  res.status(201).json({
    message: 'success upload chunk',
    chunkname,
    destination,
    full: false,
  });
});

exports.UploadNewFileLargeMultilpartConcatenate = catchAsync(async (req, res, next) => {
  console.log(req.body);
  console.log(req.headers);
  let arrayChunkName = req.body.arraychunkname;
  let filename = req.headers.filename;
  let ext = req.headers.ext;
  let destination = req.headers.destination;
  console.log('file is completed, begin concat');
  arrayChunkName.forEach((chunkName) => {
    console.log(chunkName);
    console.log('begin append');
    console.log(destination);
    console.log('./'+destination+chunkName)
    const data = fs.readFileSync('./'+destination+chunkName);
    fs.appendFileSync('./'+destination +filename+ '.' + ext, data);
    console.log('complete append');
    console.log('begin delete');
    fs.unlinkSync('./'+destination+chunkName);
    console.log('complete delete ' + chunkName);
  });
  console.log(filename);
  req.file={
    path:destination +filename+ '.' + ext,
    destination,
    filename:filename+'.'+ext,

}
  // res.status(201).json({
  //   status: 'success concat',
  //   filename,
  // });
  next();
});

exports.UploadNewFileLargeGetVideoThumbnail = catchAsync(async (req, res, next) => {
 const file = req.file;
 const filePath = file.path;
 const destination = file.destination;
 const fileFolder = file.filename.split('.')[0];
 fs.access(destination + fileFolder, (error) => {
   // To check if the given directory
   // already exists or not
   if (error) {
     // If current directory does not exist
     // then create it
     fs.mkdir(destination + fileFolder, (error) => {
       if (error) {
         console.log(error);
       } else {
         console.log('New Directory created successfully !!');
       }
     });
   } else {
     console.log('Given Directory already exists !!');
   }
 });
 console.log(file);
 console.log('Do ffmpeg shit');

 await fluentFfmpeg(filePath)
   .on('end', async function () {
     console.log('Screenshots scans taken');

     await fluentFfmpeg(filePath)
       .on(
         'filenames',
         catchAsync(async (filenames) => {
           console.log('screenshots are ' + filenames.join(', '));
         })
       )
       .screenshots({
         timestamps: [helperAPI.GenerrateRandomNumberBetween(4, 9)],
         filename: 'thumbnail_' + fileFolder + '.png',
         folder: destination,
         size: '900x600',
       })
       .on('end', async function () {
         console.log('Thumbnail taken');
  res.status(201).json({
    status: 'success concat, get thumbnail',
    file,
  });       });
   })
   .output(destination + fileFolder + '/scans-%04d.png')
   .outputOptions('-vf', 'fps=1/8')
   .run();
});

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

exports.CreateNewThread = catchAsync(async (req, res) => {
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
});

exports.VideoStreamingFile = catchAsync(async (req, res, next) => {
  // Ensure there is a range given for the video
  const range = req.headers.range;
  if (!range) {
    res.status(400).send('Requires Range header');
  }
  console.log(req.headers);
  if (!range) {
    res.status(400).json({
      status: 'failed',
    });
    return;
  }
  const videoPath = 'videos/' + req.params.filename + '.mp4';
  const videoSize = fs.statSync(videoPath).size;
  console.log(videoSize);

  // Parse Range
  // Example: "bytes=32324-"
  const CHUNK_SIZE = 10 ** 6; // 1MB nên để tầm nhiêu đây thôi, chunk size cao hơn dễ bị lỗi
  const start = Number(range.replace(/\D/g, ''));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

  // Create headers
  const contentLength = end - start + 1;
  const headers = {
    'Content-Range': `bytes ${start}-${end}/${videoSize}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': contentLength,
    'Content-Type': 'video/mp4',
  };

  // HTTP Status 206 for Partial Content
  res.writeHead(206, headers);

  // create video read stream for this particular chunk
  const videoStream = fs.createReadStream(videoPath, { start, end });

  // Stream the video chunk to the client
  videoStream.pipe(res);
});

exports.VideoStreamingHLS = catchAsync(async (req, res, next) => {
  var filename = req.params.filename.split('.')[0];
  var ext = req.params.filename.split('.')[1];
  if (!fs.existsSync('videos/convert/outputm3u8_' + filename + '.m3u8')) {
    if (!fs.existsSync('videos/' + req.params.filename)) {
      console.log('File not exist, please check name!: videos/' + req.params.filename);
      res.status(404).json({
        message: 'File not exist, please check name!: videos/' + req.params.filename,
      });
      return;
    }

    console.log('File not converted yet, start convert ...');

    fluentFfmpeg('videos/' + req.params.filename, { timeout: 432000 })
      .addOptions(['-profile:v baseline', '-level 3.0', '-start_number 0', '-hls_time 6', '-hls_list_size 0', '-f hls'])
      .output('videos/convert/' + filename + '.m3u8')
      .on('start', function () {})
      .on('end', function () {
        console.log('end ffmpeg');
        res.status(206).json({
          message: 'sucess' + 'videos/convert/outputm3u8_' + req.params.filename + '.m3u8',
        });
      })
      .on('progress', function (progress) {
        console.log('Processing: ' + progress.percent + '% done');
        console.log(progress);
      })
      .on('error', function (err, stdout, stderr) {
        if (err) {
          console.log(err.message);
          console.log('stdout:\n' + stdout);
          console.log('stderr:\n' + stderr);
          res.status(400).json({
            error: err,
          });
        }
      })
      .run();
  } else {
    console.log('File found, start streaming');
  }
  console.log('File found, start streaming');

  const range = req.headers.range;
  if (!range) {
    res.status(400).json({
      error: 'Requires Range header',
    });
  }

  const videoPath = 'videos/convert/' + filename + '.m3u8';
  const videoSize = fs.statSync(videoPath).size;
  console.log(videoSize);

  // const CHUNK_SIZE=20**6//1MB

  // const start=Number(range.replace(/\D/g,""));
  // const end=Math.min(start+CHUNK_SIZE,videoSize-1);

  // const contentLength=end-start+1;
  // const headers={
  //   'Content-Range':'bytes '+(start-end)/videoSize,
  //   'Accept-Ranges':'bytes',
  //   'Content-Length':contentLength,
  //   'Content-Type':'video/mp4',
  // };

  // res.writeHead(206, headers);
  // const videoStream = fs.createReadStream(videoPath, { start, end });
  // videoStream.pipe(res);

  res.status(206).json({
    status: 'done',
  });
});

exports.VideoTemplateHLSStreaming = catchAsync(async (req, res, next) => {
  var filename = req.params.filename.split('.')[0];
  req.filename = filename;
  var ext = req.params.filename.split('.')[1];
  if (!fs.existsSync('videos/convert/' + filename + '.m3u8')) {
    if (!fs.existsSync('videos/' + req.params.filename)) {
      console.log('File not exist, please check name!: videos/' + req.params.filename);
      next();
      return;
    }

    console.log('videos/convert/' + filename + '.m3u8');
    console.log('File not converted yet, start convert ...');

    await fluentFfmpeg('videos/' + req.params.filename, { timeout: 432000 })
      .addOptions(['-profile:v baseline', '-level 3.0', '-start_number 0', '-hls_time 6', '-hls_list_size 0', '-f hls'])
      .output('videos/convert/' + filename + '.m3u8')
      .on('start', function () {})
      .on('end', function () {
        console.log('end ffmpeg');
        next();
      })
      .on('progress', function (progress) {
        console.log('Processing: ' + progress.percent + '% done');
        console.log(progress);
      })
      .on('error', function (err, stdout, stderr) {
        if (err) {
          console.log(err.message);
          console.log('stdout:\n' + stdout);
          console.log('stderr:\n' + stderr);
          next();
        }
      })
      .run();
  } else {
    console.log('File found, start streaming');
  }

  next();
});

exports.VideoConverter = catchAsync(async (req, res, next) => {
  // exec('videos/ffmpeg_batch.bat', (error, stdout, stderr) => {
  //   if (error) {
  //     res.status(400).json({
  //       error: error,
  //     });
  //     return;
  //   }
  //   if (stdout) {
  //     res.status(400).json({
  //       info: stdout,
  //     });
  //     return;
  //   }
  //   if (stderr) {
  //     res.status(400).json({
  //       info: stderr,
  //     });
  //     return;
  //   }
  // });

  const filename = decodeURIComponent(req.params.filename);
  console.log('>>filename');
  console.log(filename);
  if (!fs.existsSync('videos/' + filename + '.mp4')) {
    console.log('File not found!: videos/' + filename + '.mp4');
    res.status(400).json({
      message: 'File not found! Video is not available ' + filename + '.mp4',
    });
    return;
  }

  //ưu tiên file nào có master trước
  if (fs.existsSync('videos/convert/' + filename + '_master.m3u8')) {
    console.log('File converted!: /videos/convert/' + filename);
    res.status(200).json({
      status: 'found and converted',
      message: 'File found and conveterd! ' + filename + '.m3u8',
      path: '/videos/convert/' + filename + '_master.m3u8',
    });
    return;
  }
  //sau đó mới tìm file không có master
  if (fs.existsSync('videos/convert/' + filename + '.m3u8')) {
    console.log('File converted!: /videos/convert/' + filename);
    res.status(200).json({
      status: 'found and converted',
      message: 'File found and conveterd! ' + filename + '.m3u8',
      path: '/videos/convert/' + filename + '.m3u8',
    });
    return;
  }

  // create embeded subtitle to hls
  // ưu tiên có sub ass trước
  // if(fs.existsSync('videos/' + filename + '.ass')){
  //   console.log('ass subtitle')

  //   fluentFfmpeg('videos/' + filename + '.mp4', { timeout: 432000 })
  //   .input('videos/' + filename + '.ass')
  //   .inputOptions(['-itsoffset 0.85'])
  //   .addOptions(['-c copy','-c:s webvtt', '-level 3.0', '-start_number 0', '-hls_time 10', '-hls_list_size 0', '-f hls'])
  //   .output('videos/convert/' + filename + '.m3u8')
  //   .on('start', function () {})
  //   .on('end', function () {
  //     console.log('end ffmpeg');
  //     res.status(206).json({
  //       message: 'sucess convert!',
  //       path: '/videos/convert/' + filename + '.m3u8',
  //     });
  //   })
  //   .on('progress', function (progress) {
  //     console.log('Processing: ' + progress.percent + '% done');
  //     console.log(progress);
  //   })
  //   .on('error', function (err, stdout, stderr) {
  //     if (err) {
  //       console.log(err.message);
  //       console.log('stdout:\n' + stdout);
  //       console.log('stderr:\n' + stderr);
  //       res.status(400).json({
  //         error: err,
  //       });
  //     }
  //   })
  //   .run();
  //   return;
  // }
  // //các tùy chỉnh cho file sub srt
  // if(fs.existsSync('videos/' + filename + '.srt')){
  //   console.log('srt subtitle')
  //   fluentFfmpeg('videos/' + filename + '.mp4', { timeout: 432000 })
  //   .input('videos/' + filename + '.srt')
  //   .inputOptions(['-itsoffset 0.85'])
  //   .addOptions(['-c copy','-c:s webvtt', '-level 3.0', '-start_number 0', '-hls_time 10', '-hls_list_size 0', '-f hls'])
  //   .output('videos/convert/' + filename + '.m3u8')
  //   .on('start', function () {})
  //   .on('end', function () {
  //     console.log('end ffmpeg');
  //     res.status(206).json({
  //       message: 'sucess convert!',
  //       path: '/videos/convert/' + filename + '.m3u8',
  //     });
  //   })
  //   .on('progress', function (progress) {
  //     console.log('Processing: ' + progress.percent + '% done');
  //     console.log(progress);
  //   })
  //   .on('error', function (err, stdout, stderr) {
  //     if (err) {
  //       console.log(err.message);
  //       console.log('stdout:\n' + stdout);
  //       console.log('stderr:\n' + stderr);
  //       res.status(400).json({
  //         error: err,
  //       });
  //     }
  //   })
  //   .run();
  //   return;
  // }

  fluentFfmpeg('videos/' + filename + '.mp4', { timeout: 432000 })
    .addOptions(['-profile:v baseline', '-level 3.0', '-start_number 0', '-hls_time 6', '-hls_list_size 0', '-f hls'])
    .output('videos/convert/' + filename + '.m3u8')
    .on('start', function () {})
    .on('end', function () {
      console.log('end ffmpeg');
      res.status(206).json({
        message: 'sucess convert!',
        path: '/videos/convert/' + filename + '.m3u8',
      });
    })
    .on('progress', function (progress) {
      console.log('Processing: ' + progress.percent + '% done');
      console.log(progress);
    })
    .on('error', function (err, stdout, stderr) {
      if (err) {
        console.log(err.message);
        console.log('stdout:\n' + stdout);
        console.log('stderr:\n' + stderr);
        res.status(400).json({
          error: err,
        });
      }
    })
    .run();
});
exports.VideoPlayOPTIONS = catchAsync(async (req, res, next) => {
  const filename = decodeURIComponent(req.params.filename);
  if (!fs.existsSync('videos/' + filename + '.mp4')) {
    console.log('File not found!: videos/' + filename + '.mp4');
    res.status(400).json({
      message: 'File not found! ' + filename + '.mp4',
    });
    return;
  }

  if (fs.existsSync('videos/convert/' + filename + '.m3u8')) {
    console.log('File converted!: /videos/convert/' + filename);
    const result = {
      status: 'found and converted',
      message: 'File found and conveterd! ' + filename + '.m3u8',
      path: '/videos/convert/' + filename + '.m3u8',
    };
    console.log(result);
    res.redirect('/videos/convert/' + filename + '.m3u8');
    return;
  }

  fluentFfmpeg('videos/' + filename + '.mp4', { timeout: 432000 })
    .addOptions(['-profile:v baseline', '-level 3.0', '-start_number 0', '-hls_time 6', '-hls_list_size 0', '-f hls'])
    .output('videos/convert/' + filename + '.m3u8')
    .on('start', function () {})
    .on('end', function () {
      console.log('end ffmpeg');
      const result = {
        message: 'sucess convert!',
        path: '/videos/convert/' + filename + '.m3u8',
      };
      console.log(result);
      res.redirect('/videos/convert/' + filename + '.m3u8');
    })
    .on('progress', function (progress) {
      console.log('Processing: ' + progress.percent + '% done');
      console.log(progress);
    })
    .on('error', function (err, stdout, stderr) {
      if (err) {
        console.log(err.message);
        console.log('stdout:\n' + stdout);
        console.log('stderr:\n' + stderr);
        res.status(400).json({
          error: err,
        });
      }
    })
    .run();
});
