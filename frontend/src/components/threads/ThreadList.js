import React from "react";

import Thread from "./Thread";

const ThreadList = (props) => {
    const threads = props.threads.map((thread) => (
        <Thread
            key={props.threads.indexOf(thread)}
            thread={thread}
        />
    ));
    return (
        <ul className="thread-list">
            {threads}
        </ul>
    );
};

export default ThreadList;