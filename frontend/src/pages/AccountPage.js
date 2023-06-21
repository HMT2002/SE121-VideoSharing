import React, { useContext, useEffect, useState } from "react";

import AuthContext from "../contexts/auth-context";
import UserAPIs from "../APIs/user-apis";
import AccountOverview from "../components/accounts/AccountOverview";
import AccountDetails from "../components/accounts/AccountDetails";
import ContentCreatorInfo from "../components/accounts/ContentCreatorInfo";
import ReactLoading from "react-loading";

import { useNavigate } from "react-router-dom";

import "../styles/AccountPage.css";

const AccountPage = () => {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const getUserInfo = async () => {
            const response = await UserAPIs.GETUserInfoAction(
                authContext.username,
                authContext.token);

            if (response != null && response.status === "success") {
                const data = response.data;
                setUserInfo(data[0]);
            } else {
                console.log("Unexpected error. Can't find user!");
            }
        }

        if (authContext.isAuthorized != null)
            if (!authContext.isAuthorized)
                navigate("/login");
            else {
                getUserInfo();
            }
    }, [authContext, navigate]);

    return (
        <React.Fragment>
            {!userInfo && <div className="account-page__loading"><ReactLoading type="spin" width="50px" height="50px" color="#13088e" /></div>}
            {userInfo && <div className="account-page">
                <AccountOverview context={authContext} userInfo={userInfo} />
                <div className="account-page__separator" />
                <AccountDetails context={authContext} userInfo={userInfo} />
                <div className="account-page__separator" />
                <ContentCreatorInfo userInfo={userInfo} userToken={authContext.token} />
            </div>}
        </React.Fragment>
    );
};

export default AccountPage;