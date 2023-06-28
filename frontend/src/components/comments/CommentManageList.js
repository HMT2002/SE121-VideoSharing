import React from "react";

// import ThreadManage from "./ThreadManage";
import WorkshopNoContentAvailable from "../workshops/WorkshopNoContentAvailable";

const CommentManageList = ({ comments, onDeleteComment, context }) => {
    const commentList = comments.map((comment) => (
        <ThreadManage
            key={comments.indexOf(comment)}
            thread={comment}
            onDelete={onDeleteComment} />
    ));

    return (
        <React.Fragment>
            {commentList.length === 0 && <WorkshopNoContentAvailable account={context.username} type="comment" />}
            {commentList.length > 0 && <div>{commentList}</div>}
        </React.Fragment>
    );
};

export default CommentManageList;