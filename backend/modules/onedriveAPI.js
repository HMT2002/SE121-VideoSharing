var fs = require('fs');
var mime = require('mime');
var request = require('request');

// var file = 'c:/Exports/box.zip'; // Filename you want to upload on your local PC
// var onedrive_folder = 'samplefolder'; // Folder name on OneDrive
// var onedrive_filename = 'box.zip'; // Filename on OneDrive

module.exports = async (file, onedrive_folder, onedrive_filename) => {
  console.log('jump onedriveAPI');
  request.post(
    {
      url: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
      form: {
        redirect_uri: 'http://localhost/3000',
        client_id: process.env.ONEDRIVE_CLIENT_ID,
        client_secret: process.env.ONEDRIVE_CLIENT_SECRET,
        refresh_token: process.env.ONEDRIVE_REFRESH_TOKEN,
        grant_type: 'refresh_token',
      },
    },
    function (error, response, body) {
      fs.readFile(file, function read(e, f) {
        request.put(
          {
            url:
              'https://graph.microsoft.com/v1.0/drive/root:/' + onedrive_folder + '/' + onedrive_filename + ':/content',
            headers: {
              Authorization: 'Bearer ' + JSON.parse(body).access_token,
              'Content-Type': mime.lookup(file),
            },
            body: f,
          },
          function (er, re, bo) {
            console.log('res');
            console.log(bo);
          }
        );
      });
    }
  );
};
