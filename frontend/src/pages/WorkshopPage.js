import React, { useContext, useEffect, useState } from "react";

import AuthContext from "../contexts/auth-context";
import WorkshopTabBar from "../components/workshops/WorkshopTabBar";
import WorkshopDashBoard from "../components/workshops/WorkshopDashboard";
import WorkshopThreadManager from "../components/workshops/WorkshopThreadManager";
import WorkshopCommentManager from "../components/workshops/WorkshopCommentManager";
import WorkshopCreateThread from "../components/workshops/WorkshopCreateThread";
import ReactLoading from "react-loading";

import "../styles/WorkshopPage.css";

const WorkshopPage = () => {
    const initialTabIndex = 1;

    const authContext = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(true);
    const [currentTab, setCurrentTab] = useState(initialTabIndex);

    const ChangeTabHandler = (index) => {
        setCurrentTab(index)
    }

    useEffect(() => {
        if (authContext.isAuthorized != null)
            setIsLoading(false);
    }, [authContext]);

    return (
        <React.Fragment>
            {isLoading && <div className="account-page__loading"><ReactLoading type="spin" width="50px" height="50px" color="#13088e" /></div>}
            {!isLoading && <div className="workshop-page">
                {currentTab === 1 && <WorkshopDashBoard context={authContext} />}
                {currentTab === 2 && <WorkshopThreadManager context={authContext} />}
                {currentTab === 3 && <WorkshopCommentManager context={authContext} />}
                {currentTab === 4 && <WorkshopCreateThread context={authContext} />}
                <WorkshopTabBar onChangeTab={ChangeTabHandler} />
            </div>}
        </React.Fragment>
    );
};

export default WorkshopPage;