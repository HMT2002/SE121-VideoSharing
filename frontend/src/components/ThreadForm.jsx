import React, { useState } from 'react';
import { POSTVideoUploadAction } from '../actions/threadActions';

import './ThreadForm.css';
const ThreadForm = (props) => {
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredContent, setEnteredContent] = useState('');
  const [videoDriveLink, setVideoDriveLink] = useState('');
  const [videoImgurThumbnailLink, setVideomgurThumbnailLink] = useState('');

  const [enteredVideo, setEnteredVideo] = useState('');
  const [enteredTag, setEnteredTag] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVideoUploaded, setIsVideoUploaded] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const contentChangeHandler = (event) => {
    setEnteredContent(event.target.value);
  };

  const videoChangeHandler = async (event) => {
    if (event.target.files[0] === undefined) {
      console.log('file not selected');
      return;
    }

    setEnteredVideo(event.target.value);
    setIsLoading(true);
    setErrorMessage('Video is uploading');
    //console.log(event.target.value);
    //console.log(event.target);
    console.log(event.target.files[0]);

    const filesize = (event.target.files[0].size / 1024 / 1024).toFixed(4); // MB
    const filetype = event.target.files[0].type; // mimetype, ex: "video.mp4"

    console.log(filesize);
    console.log(filetype);

    if (filesize > 300) {
      console.log(filesize + ' is to big');
      setErrorMessage(filesize + ' is to big');
      return;
    }
    if (!filetype.includes('video')) {
      console.log(filetype + ' is wrong format');
      setErrorMessage(filetype + ' is wrong format');
      return;
    }

    let formData = new FormData();
    formData.append('myFile', event.target.files[0]);
    const data = await POSTVideoUploadAction(formData);
    setVideoDriveLink('https://drive.google.com/uc?export=view&id=' + data.driveID);
    setVideomgurThumbnailLink(data.thumbnail);
    // console.log(data.driveID);

    setIsVideoUploaded(true);
    setIsLoading(false);
    setErrorMessage('');
  };

  const tagChangeHandler = (event) => {
    setEnteredTag(event.target.value);
  };

  const submitChangeHandler = (event) => {
    event.preventDefault();

    if (
      isLoading ||
      enteredTitle === '' ||
      enteredVideo === '' ||
      enteredTag === '' ||
      enteredContent === '' ||
      videoDriveLink === ''
    ) {
      if (isLoading) {
        console.log('Video is loading, please wait');
      } else {
        console.log('Missing information');
      }
      return;
    }

    setEnteredTitle(enteredTitle.trim());
    let slug = enteredTitle;

    slug = slug.trim();

    // chuyển về dạng tổ hợp
    slug = slug.normalize('NFD');
    // xóa các ký tự dấu tổ hợp
    slug = slug.replace(/[\u0300-\u036f]/g, '');
    // chuyển chữ đ/Đ thành d/D
    slug = slug.replace(/[đĐ]/g, (m) => (m === 'đ' ? 'd' : 'D'));

    slug = slug.toLowerCase();
    slug = slug.replace('-', '_');

    slug = slug.replace(' ', '-');

    const threadData = {
      title: enteredTitle,
      video: { vidLink: videoDriveLink, thumbLink: videoImgurThumbnailLink },
      content: enteredContent,
      tag: enteredTag,
      slug: slug,
    };
    let error = null;
    if (enteredContent === '' || enteredTitle === '' || enteredTag === '' || enteredVideo === '') {
      error = 'Missing information';
    }
    props.onSaveThreadData(threadData, error);

    //console.log(error);
    setEnteredTitle('');
    setEnteredVideo('');
    setEnteredContent('');
    setVideoDriveLink('');
    setVideomgurThumbnailLink('');
    setEnteredTag('');
  };

  return (
    <form onSubmit={submitChangeHandler}>
      <div className="new-thread__controls">
        <div className="new-thread__controls">
          <label>Title</label>
          <input type="text" onChange={titleChangeHandler} value={enteredTitle} />
        </div>

        <div className="new-thread__controls">
          <label>Explain Video</label>
          <input
            id="myFile"
            name="myFile"
            type="file"
            onChange={videoChangeHandler}
            value={enteredVideo}
            accept="video/*"
          />
        </div>

        <div className="new-thread__controls">
          <label>Content</label>
          <input type="text" onChange={contentChangeHandler} value={enteredContent} />
        </div>
        <div className="new-thread__controls">
          <label>Choose a car:</label>
          <select onChange={tagChangeHandler} value={enteredTag}>
            <option>Đời sống</option>
            <option>Kỹ thuật</option>
            <option>Mỹ thuật</option>
            <option>Ẩm thực</option>
            <option>Du lịch</option>
          </select>
        </div>
      </div>

      <div className="new-thread__actions">
        <button type="submit">Create new thread</button>
      </div>

      {!isLoading && <img id="video-preview" src={videoImgurThumbnailLink} controls loop></img>}
      <div className="new-thread__error_message">
        <p>{errorMessage}</p>
      </div>
    </form>
  );
};
export default ThreadForm;
