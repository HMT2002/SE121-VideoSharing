import React, { useEffect, useState } from "react";

const Comment = (props) => {
    const [content, setContent] = useState("");
    const [createdDate, setCreatedDate] = useState(Date.now());
    const [creator, setCreator] = useState();

    console.log(props.details.user);

    useEffect(() => {
        setContent(props.details.content);
        setCreatedDate(props.details.createDate);
        setCreator(props.details.user);
    }, [props])

    return (
        <React.Fragment>
            <img
                className="comment-input__user-avatar"
                src={creator.photo.link}
                alt="User Avatar" />
        </React.Fragment>
    );
}

export default Comment;