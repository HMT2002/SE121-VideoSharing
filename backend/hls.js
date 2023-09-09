var ffmpeg = require('fluent-ffmpeg');

// host, port and path to the RTMP stream
var host = 'localhost';
var port = '1935';
var path = '/live/test';

function callback() {
  // do something when stream ends and encoding finshes }

  ffmpeg('rtmp://' + host + ':' + port + path, { timeout: 432000 })
    .addOptions([
      '-c:v libx264',
      '-c:a aac',
      '-ac 1',
      '-strict -2',
      '-crf 18',
      '-profile:v baseline',
      '-maxrate 400k',
      '-bufsize 1835k',
      '-pix_fmt yuv420p',
      '-hls_time 10',
      '-hls_list_size 6',
      '-hls_wrap 10',
      '-start_number 1',
    ])
    .output('videos/convert/outputm3u8_哀の隙間.m3u8')
    .on('end', callback)
    .run();
}
