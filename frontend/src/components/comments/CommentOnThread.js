import React, { useEffect, useState } from "react";

import Utils from "../../Utils";

import "../../styles/CommentOnThread.css";

const CommentOnThread = (props) => {
    const [content, setContent] = useState("");
    const [createdDate, setCreatedDate] = useState(Date.now());
    const [creator, setCreator] = useState({ photo: { link: '' } });

    useEffect(() => {
        setContent(props.details.content);
        setCreatedDate(props.details.createDate);
        setCreator(props.details.user);
    }, [props])

    return (
        <React.Fragment>
            <div className="comment">
                <img
                    className="comment__creator-avatar"
                    src={creator.photo.link}
                    alt="User Avatar" />
                <div>
                    <div className="comment__details">
                        <div className="comment__details__creator-name">{creator.username}</div>
                        <div className="comment__details__created-date">{Utils.DateFormatter(new Date(createdDate))}</div>
                    </div>
                    <div>{content}</div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default CommentOnThread;