export const GETAllCommentAction = async (slug) => {
    if (!slug) {
        return { status: 'fail' };
    }
    const response = await fetch('/api/v1/threads/' + slug + '/comment', {
        method: 'GET',
        headers: {
            // 'Content-Type': 'application/json',
            // Authorization: storedToken,
        },
    });

    const data = await response.json();
    // console.log(dataComment);
    return data;
};

export const POSTCommentAction = async (comment, threadSlug, token) => {
    if (!comment) {
        return { status: 'fail' };
    }
    const response = await fetch('/api/v1/threads/' + threadSlug + '/comment', {
        method: 'POST',
        body: JSON.stringify(comment),
        headers: {
            'Content-Type': 'application/json',
            Authorization: token,
        },
    });
    const data = await response.json();
    // console.log(response_data);
    return data;
};

export const GETAllCommentsFromUserThreads = async (account, token) => {
    const response = await fetch('/api/v1/threads/comments/' + account, {
        method: 'GET',
        headers: {
            Authorization: token,
        },
    });
    const data = await response.json();
    // console.log(response_data);
    return data;
}

export const DELETECommentAction = async (token, payload) => {
    try {
        const response = await fetch("/api/v1/threads/comments/ext/" + payload.comment._id, {
            method: "DELETE",
            body: JSON.stringify(payload),
            headers: {
                Authorization: token,
            }
        });
        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error);
    }
}

const PATCHUpdateCommentAction = async (token, payload) => {
    try {
        const response = await fetch("/api/v1/threads/comments/ext/" + payload.id, {
            method: "PATCH",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            }
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

const commentAPIs = {
    GETAllCommentsFromUserThreads,
    GETAllCommentAction,
    POSTCommentAction,
    DELETECommentAction,
    PATCHUpdateCommentAction
};

export default commentAPIs;
