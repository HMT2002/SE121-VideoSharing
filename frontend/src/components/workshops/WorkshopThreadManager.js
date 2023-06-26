import React, { useEffect } from "react";

import { GETAllThreadsByUserAction } from "../../APIs/thread-apis";

const WorkshopThreadManager = (props) => {
    useEffect(() => {
        const FetchThreadsCreatedByUser = async () => {
            try {
                console.log(props.context);
                const response = await GETAllThreadsByUserAction(
                    props.context.username,
                    props.context.token);

                console.log(response);
            } catch (error) {
                console.log(error);
            }
        }

        FetchThreadsCreatedByUser();
    }, [props.context]);

    return (
        <React.Fragment>
            <div className="workshop-page__title">Threads</div>
        </React.Fragment>
    );
}

export default WorkshopThreadManager;