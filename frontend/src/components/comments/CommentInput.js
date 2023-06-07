import React, { useState } from "react";

import Input from "../UI elements/Input";
import Button from "../UI elements/Button";

import "../../styles/CommentInput.css";

const CommentInput = (props) => {
    const [commentInput, setCommentInput] = useState("");

    const CommentInputChangeHandler = (event) => {
        setCommentInput(event.target.value);
    }

    const PostCommentSubmitHandler = (event) => {
        event.preventDefault();
        props.onUserPostComment(commentInput);
        setCommentInput("");
    }

    return (
        <React.Fragment>
            <form className={"comment-input__form " + props.className} onSubmit={PostCommentSubmitHandler}>
                <img
                    className="comment-input__user-avatar"
                    src="https://aniyuki.com/wp-content/uploads/2022/03/aniyuki-cute-anime-avatar-profile-picture-14.jpg"
                    alt="User Avatar" />
                <div style={{ width: "100%" }}>
                    <Input
                        className="comment-input__input-field"
                        multiline={true}
                        minRows={2}
                        value={commentInput}
                        onChange={CommentInputChangeHandler}
                        variant="filled"
                        label={null}
                        placeholder="Write your comment here..." />
                    <Button className="comment-input__submit-button">Post</Button>
                </div>
            </form>
        </React.Fragment>
    );
};

export default CommentInput;
