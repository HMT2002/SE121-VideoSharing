import React, { useEffect, useRef, useState } from "react";

import Utils from "../../Utils";
import Input from "../UI elements/Input";
import Button from "../UI elements/Button";
import ReactLoading from "react-loading";

import { GETThreadAction } from "../../APIs/thread-apis";
import { Link, useLocation, useParams } from "react-router-dom";
import { POSTVideoUploadAction, PATCHThreadUpdateAction } from "../../APIs/thread-apis";
import { TextField, Autocomplete } from "@mui/material";
import { RiVideoFill } from "react-icons/ri";
import { BiRefresh } from "react-icons/bi";

const optionsThreadTags = [
    "Đời sống",
    "Kỹ thuật",
    "Mỹ thuật",
    "Ẩm thực",
    "Du lịch"
]

let initialTag = "";
let initialContent = "";
let initialVideo = "";

const WorkshopEditThread = (props) => {
    const [threadTitle, setThreadTitle] = useState("");
    const [threadTag, setThreadTag] = useState("");
    const [threadTagInput, setThreadTagInput] = useState("");

    const [threadContent, setThreadContent] = useState("");

    const [threadVideo, setThreadVideo] = useState(null);
    const [threadVideoURL, setThreadVideoURL] = useState(null);
    const [threadVideoName, setThreadVideoName] = useState(null);

    const [isValidThreadTag, setIsValidThreadTag] = useState(null);
    const [isValidThreadContent, setIsValidThreadContent] = useState(null);

    const [isThreadChange, setIsThreadChange] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [threadLink, setThreadLink] = useState(null);

    const { state, } = useLocation();
    const { slug } = useParams();

    const threadVideoRef = useRef();

    const ThreadTagChangeHandler = (event, newValue) => {
        setThreadTag(newValue != null ? newValue : "");
        setIsValidThreadTag(optionsThreadTags.includes(threadTag));
        setIsThreadChange(newValue !== initialTag);
    }

    const ThreadTagInputValueChangeHandler = (event, newValue) => {
        setThreadTagInput(newValue != null ? newValue : "");
        setIsValidThreadTag(optionsThreadTags.includes(threadTag));
    }

    const ThreadContentChangeHandler = (event) => {
        setThreadContent(event.target.value);
        setIsValidThreadContent(threadContent.length >= 50);
        setIsThreadChange(event.target.value !== initialContent);
    }

    const VideoChangeHandler = async (event) => {
        if (event.target.files.length > 0) {
            const localURL = await URL.createObjectURL(event.target.files[0]);
            setThreadVideo(event.target.files[0]);
            setThreadVideoURL(localURL);
            setThreadVideoName(event.target.files[0].name);
            setIsThreadChange(true);
        }
    }

    const BrowseVideoHandler = () => {
        threadVideoRef.current.click();
    }

    const UpdateThreadHandler = async () => {
        setIsProcessing(true);
        try {
            const payload = {
                content: threadContent,
                video: state.video,
                title: threadTitle,
                slug: state.slug,
                tag: threadTag,
                updateDate: Date.now()
            };
            const response = await PATCHThreadUpdateAction(props.context.token, payload);

            console.log(response);

            if (response != null && response.status === "success update") {
                alert("Thread updated successfully!");
            }
        } catch (error) {
            console.log(error);
        }
        setIsProcessing(false);
    }

    useEffect(() => {
        const InitState = (thread) => {
            initialTag = thread.tag;
            initialContent = thread.content;

            const tagIndex = optionsThreadTags.indexOf(thread.tag);

            setThreadTitle(thread.title);
            setThreadTagInput(optionsThreadTags[tagIndex]);
            setThreadTag(optionsThreadTags[tagIndex]);
            setThreadContent(thread.content);
            setThreadLink(document.location.origin + "/thread/" + thread.slug);

            setThreadVideoURL(`https://drive.google.com/file/d/${thread.video.vidLink}/preview`);

            setIsValidThreadTag(true);
            setIsValidThreadContent(true);

            // setcreatedDate: response.data.thread.createDate
            // thumbnail: response.data.thread.video.thumbLink
        }

        const GetThreadBySlug = async () => {
            try {
                const response = await GETThreadAction(slug);

                console.log(response);

                if (response != null && response.status === "ok") {
                    InitState(response.data.thread);
                }
            } catch (error) {
                console.log(error);
            }
        };

        console.log(state);
        console.log(slug);

        if (state == null) {
            GetThreadBySlug();
        } else {
            InitState(state);
        }
    }, [state, slug]);

    return (
        <React.Fragment>
            <div className="workshop-new-thread-tab">
                <div className="workshop-page__title">Edit Thread</div>
                <div className="workshop-new-thread-tab__work-section">
                    <div className="workshop-new-thread-tab__thread">
                        <div style={{ display: "flex", justifyContent: "space-between", width: "90.3%" }}>
                            <div style={{ width: "65%" }}>
                                <div className="workshop-new-thread-tab__label">Title</div>
                                <Input
                                    className="workshop-new-thread-tab__input"
                                    style={{ width: "100%" }}
                                    value={threadTitle}
                                    disabled />
                            </div>
                            <div style={{ width: "30%" }}>
                                <div className="workshop-new-thread-tab__label">Tag</div>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    inputValue={threadTagInput}
                                    onChangeInputValue={ThreadTagInputValueChangeHandler}
                                    value={threadTag}
                                    onChange={ThreadTagChangeHandler}
                                    options={optionsThreadTags}
                                    sx={{ width: "100%" }}
                                    disabled={isProcessing}
                                    renderInput={(params) => <TextField
                                        {...params}
                                        error={isValidThreadTag === false}
                                        placeholder="Thread Tag"
                                        helperText={isValidThreadTag === false ? "Thread tag is empty!" : ""} />} />
                            </div>
                        </div>
                        <div className="workshop-new-thread-tab__label">Content</div>
                        <Input
                            className="workshop-new-thread-tab__input-content"
                            multiline={true}
                            minRows={10}
                            value={threadContent}
                            isValid={isValidThreadContent !== false}
                            onChange={ThreadContentChangeHandler}
                            placeholder="Thread Content"
                            helperText="Thread content must be equal or greater than 50 characters!"
                            disabled={isProcessing} />
                    </div>
                    <div className="workshop-new-thread-tab__video">
                        <div className="workshop-new-thread-tab__label">Video</div>
                        {threadVideoURL == null &&
                            <Button className="workshop-new-thread-tab__video-required"
                                content="Upload Video"
                                icon={<RiVideoFill className="workshop-new-thread-tab__video-required-icon" />}
                                onClick={BrowseVideoHandler} />}
                        {threadVideoURL != null && <iframe
                            className="workshop-new-thread-tab__video-preview"
                            type="video/mp4"
                            title="uploaded video"
                            src={threadVideoURL}
                            controls
                            disabled={isProcessing} />}
                        {threadVideoURL != null &&
                            <div style={{ marginInlineEnd: "0.5rem" }}>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    width: "100%"
                                }}>
                                    <div>
                                        <div className="workshop-new-thread-tab__label workshop-new-thread-tab__label-file-name" >File name:</div>
                                        <div className="workshop-new-thread-tab__file-name">
                                            {threadVideoName}
                                            <div className="tool-tip">{threadVideoName}</div>
                                        </div>
                                    </div>
                                    <Button
                                        className="workshop-new-thread-tab__video-select-btn"
                                        icon={<BiRefresh style={{ width: "23px", height: "23px" }} />}
                                        content="Change"
                                        onClick={BrowseVideoHandler}
                                        disabled={isProcessing} />
                                </div>
                                <div style={{ marginInlineEnd: "0.5rem", marginBlockStart: "0.5rem" }}>
                                    <div className="workshop-new-thread-tab__label workshop-new-thread-tab__label-file-name" >Thread Link:</div>
                                    <div className="workshop-new-thread-tab__file-name" style={{ width: "310px" }}>
                                        <Link to={threadLink}>{threadLink}</Link>
                                        <div className="tool-tip">{threadLink}</div>
                                    </div>
                                </div>
                            </div>}
                        <Button
                            className="workshop-new-thread-tab__complete-btn"
                            icon={isProcessing &&
                                <ReactLoading className="loading-icon" type="spin" width="30px" height="30px" color="white" />}
                            content={!isProcessing ? "Save" : "Processing"}
                            disabled={isProcessing || !isThreadChange}
                            onClick={UpdateThreadHandler} />
                        <input
                            ref={threadVideoRef}
                            style={{ display: "none" }}
                            type="file"
                            accept="video/*"
                            onChange={VideoChangeHandler} />
                    </div>
                </div>
            </div>
        </React.Fragment >
    );
};

export default WorkshopEditThread;