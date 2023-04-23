import React from "react";

import Thread from "./Thread";

import "../../styles/ThreadList.css";

const ThreadList = (props) => {
    const threads = props.threads.map((thread) => (
        <li key={props.threads.indexOf(thread)}>
            <Thread thread={thread} />
        </li>
    ));
    return (
        <ul className="thread-list">
            {threads}
        </ul>
    );
};

export default ThreadList;