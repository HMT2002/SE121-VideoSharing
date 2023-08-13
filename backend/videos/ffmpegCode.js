const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');

ffmpeg.setFfmpegPath(ffmpegInstaller.path);
var args = process.argv.slice(2);
var filename=args[0].split('.')[0];
var ext=args[0].split('.')[1];

ffmpeg('./'+args[0], { timeout: 432000 })
  .addOptions(['-profile:v baseline', '-level 3.0', '-start_number 0', '-hls_time 10', '-hls_list_size 0', '-f hls'])
  .output('./'+filename+'/output.m3u8')
  .on('start', function () {
    console.log(args);
  })
  .on('end', function () {
    console.log('end ffmpeg');
    process.exit();
  })
  .on('progress', function (progress) {
    console.log('Processing: ' + progress.percent + '% done');
    console.log(progress);
  })
  .on('error', function(err, stdout, stderr) {
    if (err) {
        console.log(err.message);
        console.log("stdout:\n" + stdout);
        console.log("stderr:\n" + stderr);
    }
})
  .run();
