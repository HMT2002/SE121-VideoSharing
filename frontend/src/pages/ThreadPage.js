import React, { useCallback, useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { GETThreadAction } from "../APIs/thread-apis";
import { format, getDate } from "date-fns";

import CommentInput from "../components/comments/CommentInput";
import Card from "../components/UI elements/Card";

import "../styles/ThreadPage.css";

const DateConverter = (date) => {
    const today = Date.now();
    const offset = getDate(today - date);

    if (offset === 0) return "Today";
    if (offset > 0 && offset <= 7)
        return `${offset} ${offset > 1 ? "days" : "day"} ago`;
    if (offset > 7) return format(date, "dd-MM-yyyy").toString();
};

const ThreadPage = () => {
    const params = useParams();

    const [thread, setThread] = useState({ title: "", content: "", createdDate: Date.now() });
    const [threadVideo, setThreadVideo] = useState({ link: "", thumbnail: "" });
    const [threadCreator, setThreadCreator] = useState({ displayName: "", avatar: "" });

    const fetchThreadHandler = useCallback(async () => {
        try {
            const response = await GETThreadAction(params.slug);

            if (response.status === "success") {
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
                console.log(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    }, [params]);

    useEffect(() => {
        fetchThreadHandler();
    }, [fetchThreadHandler]);

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
                <video
                    className="video-js thread-page__thread-video"
                    controls
                    autoPlay={false}
                    poster={threadVideo.thumbnail}
                    src={threadVideo.link}
                    type="video/mp4" />
                <div className="thread-page__thread-content">
                    {thread.content}
                </div>
            </Card>
            <section className="thread-page__comments-section">
                <div className="thread-page__comments-section-label">Comments</div>
                <CommentInput className="thread-page__comments-section-input" />
            </section>
        </React.Fragment>
    );
};

export default ThreadPage;