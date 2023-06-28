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

const ThreadPage = () => {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();
    const params = useParams();

    const [thread, setThread] = useState({ title: "", content: "", createdDate: Date.now() });
    const [threadVideo, setThreadVideo] = useState({ link: "", thumbnail: "" });
    const [threadCreator, setThreadCreator] = useState({ displayName: "", avatar: "" });

    const [comments, setComments] = useState([]);

    const LoadAllComments = async () => {
        try {
            const response = await GETAllCommentAction(params.slug);

            if (response.status === "ok") {
                const unorderedComments = Array.from(response.data);
                unorderedComments.sort((a, b) => new Date(b.createDate) - new Date(a.createDate));

                setComments(unorderedComments);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const FetchThreadHandler = async () => {
            try {
                const response = await GETThreadAction(params.slug);

                if (response.status === "ok") {
                    setThread({
                        title: response.data.thread.title,
                        content: response.data.thread.content,
                        createdDate: response.data.thread.createDate
                    });
                    setThreadVideo({
                        link: response.data.thread.video.vidLink,
                        thumbnail: response.data.thread.video.thumbLink
                    });
                    setThreadCreator({
                        displayName: response.data.thread.user.username,
                        avatar: response.data.thread.user.photo.link
                    })
                }
            } catch (error) {
                console.log(error);
            }
        };

        const FetchAllCommentsHandler = async () => {
            try {
                const response = await GETAllCommentAction(params.slug);

                if (response.status === "ok") {
                    const unorderedComments = Array.from(response.data);
                    unorderedComments.sort((a, b) => new Date(b.createDate) - new Date(a.createDate));

                    setComments(unorderedComments);
                }
            } catch (error) {
                console.log(error);
            }
        }

        FetchThreadHandler();
        FetchAllCommentsHandler();
    }, [params.slug]);

    const UserPostCommentHandler = async (comment) => {
        if (!authContext.isAuthorized) return navigate("/login");

        const userToken = authContext.token;
        const threadSlug = params.slug;
        const commentData = {
            content: comment,
            createDate: Date.now(),
            thread: thread,
        };

        await POSTCommentAction(commentData, threadSlug, userToken);
        await LoadAllComments();
    }

    return (
        <React.Fragment>
            <Card className="thread-page__thread">
                <div className="thread-page__thread-title">{thread.title}</div>
                <div className="thread-page__creator">
                    <img
                        className="thread-page__creator-avatar"
                        src={threadCreator.avatar}
                        alt="Creator Avatar" />
                    <div>
                        <div className="thread-page__creator-name">
                            {threadCreator.displayName}
                        </div>
                        <div className="thread-page__thread-created-date">
                            {Utils.DateConverter(new Date(thread.createdDate))}
                        </div>
                    </div>
                </div>
                <iframe
                    className="video-js thread-page__thread-video"
                    controls
                    autoPlay={false}
                    poster={threadVideo.thumbnail}
                    title={thread.title}
                    src={`https://drive.google.com/file/d/${threadVideo.link}/preview`}
                    // src={"https://drive.google.com/uc?export=preview&id=1BD3NC7OimCQ4uZ7wJhDix2-gRacdg-LU"}
                    type="video/mp4" />
                <div className="thread-page__thread-content">
                    {thread.content}
                </div>
            </Card>
            <section className="thread-page__comments-section">
                <div className="thread-page__comments-section-label">Comments</div>
                <CommentInput
                    className="thread-page__comments-section-input"
                    onUserPostComment={UserPostCommentHandler} />
                <CommentList comments={comments} />
            </section>
        </React.Fragment>
    );
};

export default ThreadPage;