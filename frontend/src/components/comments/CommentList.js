import React from "react";

import Comment from "./Comment";

const CommentList = (props) => {
    const comments = props.comments.map(comment => {
        return (
            <Comment
                key={props.comments.indexOf(comment)}
                details={comment} />
        );
    });

    return (
        <div>{comments}</div>
    );
};

export default CommentList;