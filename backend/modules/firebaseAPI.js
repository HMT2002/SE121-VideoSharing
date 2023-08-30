
var firebaseApp = require('firebase/app');
var { getAnalytics } =require('firebase/analytics');

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASEAPIKEY,
  authDomain: process.env.FIREBASEAUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.FIREBASESTORAGEBUCKET,
  messagingSenderId: process.env.FIREBASEMESSAGINGSENDERID,
  appId: process.env.FIREBASEAPPID,
  measurementId: process.env.FIREBASEMEASUREMENTID,
};
firebaseApp.initializeApp(firebaseConfig);

const { getStorage, ref ,uploadBytes,uploadBytesResumable, getDownloadURL} =require( 'firebase/storage');
const fs = require('fs');
const { resolve } = require('path');

const storage = getStorage();

// Create a reference to './images/background-01.jpg'
const backgroundRef = ref(storage, './images/background-01.jpg');
// Create a reference to 'images/mountains.jpg'
const backgroundImagesRef = ref(storage, './images/background-01.jpg');
// While the file names are the same, the references point to different files
backgroundRef.name === backgroundImagesRef.name;           // true
backgroundRef.fullPath === backgroundImagesRef.fullPath;   // false 



const metadata = {
  contentType: 'image/jpeg',
};

module.exports = async (file,filebuffer) => {
  // 'file' comes from the Blob or File API
  console.log(file)
  const storageRef = ref(storage, 'somevideos/'+Date.now()+file.originalname);

  const snapshot=await uploadBytesResumable(storageRef, filebuffer,file.mimetype);
  console.log(snapshot);
  const downloadUrl=await getDownloadURL(snapshot.ref);
  return downloadUrl;
};
