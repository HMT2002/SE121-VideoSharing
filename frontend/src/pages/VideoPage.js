import React, { useContext, useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";
import { GETThreadAction } from "../APIs/thread-apis";
import { GETAllCommentAction, POSTCommentAction } from "../APIs/comments-apis";

import Utils from "../Utils";
import AuthContext from "../contexts/auth-context";
import CommentInput from "../components/comments/CommentInput";
import CommentList from "../components/comments/CommentList";
import Card from "../components/UI elements/Card";

import "../styles/ThreadPage.css";

const VideoPage = () => {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();
    const params = useParams();
    const [comments, setComments] = useState([]);
    const [thread, setThread] = useState({ title: "", content: "", createdDate: Date.now() });

    const [threadVideo, setThreadVideo] = useState({ link: "", thumbnail: "" });

    const LoadVideo = async () => {
        try {
            const response = await fetch('/api/test/video-stream/' + params.videoname, {
                method: 'GET',
                headers: {
                    // 'Content-Type': 'application/json',
                    // Authorization: storedToken,
                },
            });
        
            const data = await response.json();
            if (data.status === "ok") {

            }
        } catch (error) {
        }
    }
    useEffect(() => {
        const FetchThreadHandler = async () => {
            try {
            } catch (error) {
            }
        };

        const FetchAllCommentsHandler = async () => {
            try {
            } catch (error) {
            }
        }

        FetchThreadHandler();
        FetchAllCommentsHandler();
    }, [params.slug]);


    return (
        <React.Fragment>
            <Card className="thread-page__thread">
                <iframe
                    className="video-js thread-page__thread-video"
                    controls
                    autoPlay={false}
                    poster={threadVideo.thumbnail}
                    title={thread.title}
                    src={`https://drive.google.com/file/d/${threadVideo.link}/preview`}
                    // src={"https://drive.google.com/uc?export=preview&id=1BD3NC7OimCQ4uZ7wJhDix2-gRacdg-LU"}
                    type="video/mp4" />
            </Card>
        </React.Fragment>
    );
};

export default VideoPage;