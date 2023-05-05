import React, { useCallback, useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { GETThreadAction } from "../APIs/thread-apis";

const ThreadPage = () => {
    const params = useParams();

    const [threadVideo, setThreadVideo] = useState({ link: "", thumbnail: "" });

    const fetchThreadHandler = useCallback(async () => {
        try {
            const response = await GETThreadAction(params.slug);

            if (response.status === "success") {
                setThreadVideo({
                    link: response.data.thread.video.vidLink,
                    thumbnail: response.data.thread.video.thumbLink
                });
                // console.log(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    }, [params]);

    useEffect(() => {
        fetchThreadHandler();
    }, [fetchThreadHandler]);

    // console.log(threadVideo.link);

    return (
        <React.Fragment>
            <video
                className="video-js"
                controls
                autoPlay={false}
                width="640"
                height="264"
                poster={threadVideo.thumbnail}
                src={threadVideo.link}
                type="video/mp4" />
        </React.Fragment>
    );
};

export default ThreadPage;