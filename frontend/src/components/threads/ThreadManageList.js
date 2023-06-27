import React from "react";

import ThreadManage from "./ThreadManage";

const ThreadManageList = (props) => {
    const threadManages = props.threads.map((thread) => (
        <ThreadManage key={props.threads.indexOf(thread)} thread={thread} />
    ));

    return (
        <React.Fragment>
            <div>{threadManages}</div>
        </React.Fragment>
    );
};

export default ThreadManageList;