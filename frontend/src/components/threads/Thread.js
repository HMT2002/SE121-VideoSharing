import React from "react";

import Card from "../../UI elements/Card";

const Thread = (props) => {
    const thread = { ...props.thread }
    const threadVideo = thread.video;
    const threadCreator = thread.user;

    return (
        <Card className="thread">
            <div className="thread-creator">
                <img
                    className="thread-creator__avatar"
                    src={threadCreator.photo.link}
                    alt="Creator's avatar"
                />
                <h1 className="thread-creator__display-name">
                    {threadCreator.username}
                </h1>
            </div>
            <img
                className="thread-video-thumbnail"
                src={threadVideo.thumbLink}
                alt="Thread video thumbnail"
            />
            <div className="thread-summary">
                <h1 className="thread-summary__title">{props.thread.title}</h1>
                <p className="thread-summary__content">{props.thread.content}</p>
            </div>
        </Card>
    );
};

export default Thread;