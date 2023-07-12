const dotenv = require('dotenv');
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
      console.log('server js exists'+ req.url)
      const ext=req.url.split('.')[1];
      const filename=req.url.split('.')[0];
      if(ext!=='m3u8'&&ext!=='ts'){
        return cb(null,true);
      }

      fs.access(__dirname+'/videos/convert/'+filename+'.m3u8',fs.constants.F_OK,function(err){
        if(err){
          console.log(__dirname+'/videos/convert/'+filename+'.m3u8');
          console.log( 'File not exist');
          return cb(null,false);
        }

        cb(null,true);

      })
    },
    getManifestStream:(req,cb)=>{
      console.log('server js getManifestStream '+ req.url)

      const stream=fs.createReadStream(__dirname+req.url);
      cb(null,stream);
    },
    getSegmentStream:(req,cb)=>{
      console.log('server js getSegmentStream '+ req.url)
      const stream=fs.createReadStream(__dirname+req.url);
      cb(null,stream);
    },
  }
})