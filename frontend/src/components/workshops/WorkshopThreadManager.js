import React, { useEffect, useState } from "react";

import ThreadManageList from "../threads/ThreadManageList";
import ReactLoading from "react-loading";

import { GETAllThreadsByUserAction } from "../../APIs/thread-apis";

const WorkshopThreadManager = (props) => {
    const [threads, setThreads] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const FetchThreadsCreatedByUser = async () => {
            try {
                const response = await GETAllThreadsByUserAction(
                    props.context.username,
                    props.context.token);

                if (response != null && response.status === "success") {
                    setThreads(response.data.threads);
                    setIsLoading(false);
                }
            } catch (error) {
                console.log(error);
            }
        }

        FetchThreadsCreatedByUser();
    }, [props.context]);

    return (
        <React.Fragment>
            <div className="workshop-page__tab">
                <div className="workshop-page__title">Threads</div>
                {isLoading && <div className="flex center-content" style={{ height: "100%" }}>
                    <ReactLoading type="spin" width="50px" height="50px" color="#13088e" />
                </div>}
                {!isLoading && <ThreadManageList threads={threads} />}
            </div>
        </React.Fragment>
    );
}

export default WorkshopThreadManager;