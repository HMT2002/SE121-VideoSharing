import React from "react";

import ThreadManage from "./ThreadManage";

const ThreadManageList = ({ threads, onDeleteThread }) => {
    const threadList = threads.map((thread) => (
        <ThreadManage
            key={threads.indexOf(thread)}
            thread={thread}
            onDelete={onDeleteThread} />
    ));

    return (
        <React.Fragment>
            <div>{threadList}</div>
        </React.Fragment>
    );
};

export default ThreadManageList;