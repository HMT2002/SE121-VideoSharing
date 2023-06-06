import React, { useCallback, useEffect, useState, useContext } from "react";

import { useParams, useNavigate } from "react-router-dom";
import { format, getDate } from "date-fns";
import { GETThreadAction } from "../APIs/thread-apis";
import { GETAllCommentAction,POSTCommentAction } from "../APIs/comments-apis";

import AuthContext from "../contexts/auth-context";
import CommentInput from "../components/comments/CommentInput";
import Card from "../components/UI elements/Card";

import "../styles/ThreadPage.css";
import CommentList from "../components/comments/CommentList";

const DateConverter = (date) => {
    const today = Date.now();
    const offset = getDate(today - date);

    if (offset === 0) return "Today";
    if (offset > 0 && offset <= 7)
        return `${offset} ${offset > 1 ? "days" : "day"} ago`;
    if (offset > 7) return format(date, "dd-MM-yyyy").toString();
};

const ThreadPage = () => {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();
    const params = useParams();

    const [thread, setThread] = useState({ title: "", content: "", createdDate: Date.now() });
    const [threadVideo, setThreadVideo] = useState({ link: "", thumbnail: "" });
    const [threadCreator, setThreadCreator] = useState({ displayName: "", avatar: "" });

    const [comments, setComments] = useState([]);

    const FetchThreadHandler = useCallback(async () => {
        try {
            const response = await GETThreadAction(params.slug);

            if (response.status === "ok") {
                console.log(response);
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
    }, [params]);

    const FetchAllCommentsHandler = useCallback(async () => {
        try {
            const response = await GETAllCommentAction(params.slug);

            if (response.status === "ok") {
                setComments(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    }, [params]);

    useEffect(() => {
        FetchThreadHandler();
        FetchAllCommentsHandler();
    }, [FetchThreadHandler, FetchAllCommentsHandler]);

    const PostCommentHandler = (event) => {
        event.preventDefault();
        if (!authContext.isLoggedIn) {
            return navigate("/login");
        }
        console.log("comment!");
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
                            {DateConverter(new Date(thread.createdDate))}
                        </div>
                    </div>
                </div>
                <iframe
                    className="video-js thread-page__thread-video"
                    controls
                    autoPlay={false}
                    poster={threadVideo.thumbnail}
                    src={'https://drive.google.com/file/d/'+threadVideo.link+'/preview'}
                    type="video/mp4" />
                <div className="thread-page__thread-content">
                    {thread.content}
                </div>
            </Card>
            <section className="thread-page__comments-section">
                <div className="thread-page__comments-section-label">Comments</div>
                <CommentInput
                    className="thread-page__comments-section-input"
                    onSubmit={PostCommentHandler} />
                <CommentList comments={comments} />
            </section>
        </React.Fragment>
    );
};

export default ThreadPage;