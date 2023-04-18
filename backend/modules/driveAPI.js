const GoogleDriveAPIClientID = '201324749864-1smrt65sd0tamjet8glkcdolqrmt66qj.apps.googleusercontent.com';
const GoogleDriveAPIClientSecret = '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';
const GoogleDriveAPIFolerID = '1vb2ZGYvrqsz7Rrw3WErV91YxxpeL3Sxh';

const fs = require('fs');
const { google } = require('googleapis');
const { resolve } = require('path');
const auth = new google.auth.GoogleAuth({
  keyFile: './t-system-376816-d231598dc1e2.json',
  scopes: ['https://www.googleapis.com/auth/drive'],
});
const driveService = google.drive({
  version: 'v3',
  auth,
});
const fileMetaData = {
  name: 'uploadmaterials.jpg',
  parents: [GoogleDriveAPIFolerID],
};
const media = {
  mimeType: 'image/jpg',
  body: fs.createReadStream('./images/background-01.jpg'),
};

// const videoMetaData = {
//   name: 'videoUploadMaterials.mp4',
//   parents: [GoogleDriveAPIFolerID],
// };
// const videoMedia = {
//   mimeType: 'video/mp4',
//   body: fs.createReadStream('./videos/Honkai Impact - 崩坏3 - Việt Nam.mp4'),
// };

async function uploadFile(MetaData, Media) {
  try {
    // const response = await driveService.files.create({
    //   resource: fileMetaData,
    //   media: media,
    //   fields: 'id',
    // });

    const response = await driveService.files.create({
      resource: MetaData,
      media: Media,
      fields: 'id',
    });
    // console.log('Day la cai repone o driveapi: ', response);
    return response;
  } catch (err) {
    console.log('Upload error: ', err);
  }
}

module.exports = async (videoMetaData, videoMedia) => {
  var dataupload = await uploadFile(videoMetaData, videoMedia).then((data) => {
    //console.log('This is the drive api data', data);
    return data;
  });
  return dataupload;

  //https://drive.google.com/uc?export=view&id=1vlWIhif0KuNG0VDI3B1gZwFiTaHsh7_0
  //https://drive.google.com/uc?export=download&id=1vlWIhif0KuNG0VDI3B1gZwFiTaHsh7_0
};
