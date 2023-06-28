import React from "react";

import CommentOnThread from "./CommentOnThread";

const CommentOnThreadList = (props) => {
    const comments = props.comments.map(comment => {
        return (
            <CommentOnThread
                key={props.comments.indexOf(comment)}
                details={comment} />
        );
    });

    return (
        <div>{comments}</div>
    );
};

export default CommentOnThreadList;