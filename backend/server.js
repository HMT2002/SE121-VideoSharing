const dotenv = require('dotenv');
var path = require('path')

dotenv.config({ path: './config.env' });

const app = require('./app');

const dbVideoSharing = require('./config/database/db_index');

dbVideoSharing.connect();

const hls = require('hls-server');
const fs=require('fs')

//console.log(process.env);
//START SERVER
const port = process.env.PORT || 9000;
const server= app.listen(port, () => {
  console.log('App listening to ' + port);
});


new hls(server,{
  provider:{
    exists:(req,cb)=>{
      req.url=decodeURIComponent(req.url);
      console.log('server js exists'+ req.url)
      // req.url=decodeURIComponent(req.url);
      const ext=req.url.split('.')[1];
      const urlAndFilename=req.url.split('.')[0];
      if(ext!=='m3u8'&&ext!=='ts'){
        //console.log('not manifest or segment file');
        return cb(null,true);
      }
      console.log(urlAndFilename);

      fs.access(__dirname+req.url,fs.constants.F_OK,function(err){
        if(err){
          console.log(__dirname+req.url);
          console.log( err);
          return cb(null,false);
        }
        cb(null,true);
      })
    },
    getManifestStream:(req,cb)=>{
      req.url=decodeURIComponent(req.url);
      console.log('server js getManifestStream '+ req.url)
      const stream=fs.createReadStream(__dirname+req.url);
      cb(null,stream);
    },
    getSegmentStream:(req,cb)=>{
      req.url=decodeURIComponent(req.url);
      console.log('server js getSegmentStream '+ req.url)
      const stream=fs.createReadStream(__dirname+req.url);
      cb(null,stream);
    },
  }
});

const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: 9050,
    allow_origin: '*'
  }
};

var nms = new NodeMediaServer(config)
nms.run();