var fs = require('fs');
var mime = require('mime');
var request = require('request');
const { client } = require('../ClientWithOptions');
const { OneDriveLargeFileUploadTask, StreamUpload } = require('@microsoft/microsoft-graph-client');

// var file = 'c:/Exports/box.zip'; // Filename you want to upload on your local PC
// const onedrive_folder = 'samplefolder'; // Folder name on OneDrive
// const onedrive_filename = 'box.zip'; // Filename on OneDrive

module.exports = async (filepath, onedrive_folder, onedrive_filename) => {
  console.log('jump onedriveAPI');

  // request.post(
  //   {
  //     url: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
  //     form: {
  //       redirect_uri: 'http://localhost/3000',
  //       client_id: process.env.ONEDRIVE_CLIENT_ID,
  //       client_secret: process.env.ONEDRIVE_CLIENT_SECRET,
  //       refresh_token: process.env.ONEDRIVE_REFRESH_TOKEN,
  //       grant_type: 'refresh_token',
  //     },
  //   },
  //   function (error, response, body) {
  //     fs.readFile(file, function read(e, f) {
  //       request.put(
  //         {
  //           url:
  //             'https://graph.microsoft.com/v1.0/drive/root:/' + onedrive_folder + '/' + onedrive_filename + ':/content',
  //           headers: {
  //             Authorization: 'Bearer ' + JSON.parse(body).access_token,
  //             'Content-Type': mime.lookup(file),
  //           },
  //           body: f,
  //         },
  //         function (er, re, bo) {
  //           console.log('res');
  //           console.log(bo);
  //         }
  //       );
  //     });
  //   }
  // );

  // const fileName = 'FILE_NAME';
  // const file = fs.createReadStream(filepath);

  // const stats = fs.statSync(filepath);
  // const totalSize = stats.size;

  // const progress = (range, extraCallbackParam) => {
  //   // Implement the progress callback here
  //   console.log('uploading range: ', range);
  //   console.log(extraCallbackParam);
  // };

  // const uploadEventHandlers = {
  //   progress,
  //   extraCallbackParam: 'Any parameter needed by the callback implementation',
  // };

  // const options = {
  //   fileName,
  //   conflictBehavior: 'rename',
  //   rangeSize: 1024 * 1024,
  //   uploadEventHandlers,
  // };

  // const fileObject = new StreamUpload(file, fileName, totalSize);
  // //OR
  // // You can also use a FileUpload instance
  // //const file = fs.readFileSync();
  // //const fileObject = new FileUpload(file, fileName, totalSize);

  // //OR
  // // You can also create an object from a custom implementation of the FileObject interface
  // const task = await OneDriveLargeFileUploadTask.createTaskWithFileObject(client, fileObject, options);
  // const uploadResult = await task.upload();
  // return uploadResult;

  // request.post(
  //   'https://login.live.com/oauth20_authorize.srf',
  //   {
  //     form: {
  //       client_id: 'a48e57d8-5c8c-4901-8a2e-dbb387cd1464',
  //       redirect_uri: 'redirect',
  //       client_secret: 'vOf8Q~gIE0zR2sNouwiO51ijsailiFoEK0H5OaTe',
  //       scope: 'https://graph.microsoft.com/.default',
  //     },
  //   },
  //   async function (err, body) {
  //     if (err) {
  //       console.log({ Message: err.message });
  //     } else {
  //       console.log(body);
  //     }
  //   }
  // );

  // request.post(
  //   'https://login.live.com/oauth20_token.srf',
  //   {
  //     form: {
  //       client_id: 'a48e57d8-5c8c-4901-8a2e-dbb387cd1464',
  //       redirect_uri: 'api://a48e57d8-5c8c-4901-8a2e-dbb387cd1464',
  //       client_secret: 'vOf8Q~gIE0zR2sNouwiO51ijsailiFoEK0H5OaTe',
  //       grant_type: 'authorization_code',
  //       code:''
  //     },
  //   },
  //   async function (err, httpResponse, body) {
  //     if (err) {
  //       console.log({ Message: err.message });
  //     } else {
  //       let response = JSON.parse(body);
  //       console.log({ Body: JSON.parse(body) });
  //     }
  //   }
  // );

  // await request.post(
  //   'https://login.microsoftonline.com/2dff09ac-2b3b-4182-9953-2b548e0d0b39/adminconsent?',
  //   {
  //     form: {
  //       tenant: 'client_credentials',
  //       client_id: 'a48e57d8-5c8c-4901-8a2e-dbb387cd1464',
  //       state: 'RandomString',
  //       redirect_uri: 'http://localhost:4000/redirect',
  //     },
  //   },
  //   async function (err, body) {
  //     if (err) {
  //       console.log({ Message: err.message });
  //     } else {
  //       // console.log(body.body);

  //       // fs.writeFileSync('permission.html', body.body);
  //       // const response_body = JSON.parse(body);
  //       // console.log(response_body);
  //       // const access_token = response_body.access_token;

  //       // console.log(access_token);
  //       return;
  //       await fs.readFile(filepath, function read(e, f) {
  //         request.put(
  //           {
  //             url:
  //               'https://graph.microsoft.com/v1.0/drive/root:/' +
  //               onedrive_folder +
  //               '/' +
  //               onedrive_filename +
  //               ':/content',
  //             headers: {
  //               Authorization: 'Bearer ' + access_token,
  //               'Content-Type': mime.lookup(filepath),
  //             },
  //             body: f,
  //           },
  //           function (er, re, bo) {
  //             console.log(bo);
  //           }
  //         );
  //       });
  //     }
  //   }
  // );

  // await request.post(
  //   'https://login.microsoftonline.com/2dff09ac-2b3b-4182-9953-2b548e0d0b39/oauth2/v2.0/token',
  //   {
  //     form: {
  //       grant_type: 'client_credentials',
  //       client_id: 'a48e57d8-5c8c-4901-8a2e-dbb387cd1464',
  //       client_secret: 'vOf8Q~gIE0zR2sNouwiO51ijsailiFoEK0H5OaTe',
  //       scope: 'https://graph.microsoft.com/.default',
  //       // scope: 'Sites.ReadWrite.All',

  //       // redirect_uri: 'https://localhost/3000',
  //     },
  //   },
  //   async function (err, body) {
  //     if (err) {
  //       console.log({ Message: err.message });
  //     } else {
  //       // console.log(body);

  //       const response_body = JSON.parse(body.body);
  //       // console.log(response_body);
  //       const access_token = response_body.access_token;

  //       console.log(access_token);
  //       return;
  //       await fs.readFile(filepath, function read(e, f) {
  //         request.put(
  //           {
  //             url:
  //               'https://graph.microsoft.com/v1.0/drive/root:/' +
  //               onedrive_folder +
  //               '/' +
  //               onedrive_filename +
  //               ':/content',
  //             headers: {
  //               Authorization: 'Bearer ' + access_token,
  //               'Content-Type': mime.lookup(filepath),
  //             },
  //             body: f,
  //           },
  //           function (er, re, bo) {
  //             console.log(bo);
  //           }
  //         );
  //       });
  //     }
  //   }
  // );
};
