import React, { useContext, useEffect, useRef, useState } from "react";

import AuthContext from "../contexts/auth-context";
import Input from "../components/UI elements/Input";
import Button from "../components/UI elements/Button";
import Checkbox from '@mui/material/Checkbox';
import TermsOfService from "../TermsOfService";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AiOutlineCamera } from "react-icons/ai";

import { GETUserInfoAction } from "../APIs/user-apis";
import { useNavigate } from "react-router-dom";


import "../styles/AccountPage.css";

const AccountOverviewSection = (props) => {
    const avatarInputRef = useRef();
    const [avatar, setAvatar] = useState(null);

    const UploadAvatarHandler = () => {
        avatarInputRef.current.click();
    }

    const ChangeAvatarHandler = (event) => {
        if (event.target.files.length > 0)
            setAvatar(event.target.files[0]);
    }

    return (
        <React.Fragment>
            {props.userInfo != null && <div className="account-page__overview">
                <div className="account-page__overview__avatar">
                    <img
                        src={avatar == null ? props.userInfo.photo.link : URL.createObjectURL(avatar)}
                        alt="Avatar" />
                    <Button className="account-page__overview__avatar-change-btn" onClick={UploadAvatarHandler}>
                        <div className="account-page__overview__avatar-change-btn__icon">
                            <AiOutlineCamera style={{ width: "23px", height: "23px" }} />
                            <div>Edit</div>
                        </div>
                    </Button>
                    <input
                        ref={avatarInputRef}
                        style={{ display: "none" }}
                        type="file"
                        accept="image/*"
                        onChange={ChangeAvatarHandler} />
                </div>
                <div>
                    <div className="account-page__overview__username">{props.userInfo.username}</div>
                    <div className="account-page__overview__account">{"Created Date: " + props.userInfo.createdDate}</div>
                    <div className="account-page__overview__account">{"Last Updated: " + props.userInfo.lastUpdated}</div>
                </div>
            </div>}
        </React.Fragment >
    );
};

const AccountDetailsSection = (props) => {
    return (
        <React.Fragment>
            {props.userInfo != null && <div style={{ paddingInline: "12rem" }}>
                <div style={{ marginBlockEnd: "2rem" }}>
                    <div className="account-page__details__label">Account</div>
                    <div className="account-page__details__row">
                        <Input
                            className="account-page__details__input"
                            style={{ width: "320px" }}
                            label="Username"
                            defaultValue={props.userInfo.account}
                            disabled />
                        <Input
                            className="account-page__details__input"
                            style={{ width: "320px" }}
                            label="Password"
                            type="password"
                            value="********"
                            disabled />
                    </div>
                    <div
                        className="account-page__details__row"
                        style={{ justifyContent: "flex-end" }}>
                        <Button
                            className="account-page__button"
                            style={{ marginBlockStart: "0.7rem" }}
                            content="Change Password" />
                    </div>
                </div>
                <div style={{ marginBlockEnd: "2rem" }}>
                    <div className="account-page__details__label">Basic Info</div>
                    <div className="account-page__details__row">
                        <Input
                            className="account-page__details__input"
                            label="Display Name"
                            defaultValue={props.userInfo.username} />
                    </div>
                    <div className="account-page__details__row">
                        <Input
                            className="account-page__details__input"
                            label="Email"
                            defaultValue={props.userInfo.email} />
                    </div>
                    <div
                        className="account-page__details__row"
                        style={{ justifyContent: "flex-end" }}>
                        <Button
                            className="account-page__button"
                            style={{ marginBlockStart: "0.7rem", marginInlineEnd: "1rem" }}
                            content="Save" />
                        <Button
                            className="account-page__button"
                            style={{ marginBlockStart: "0.7rem" }}
                            content="Upgrade" />
                    </div>
                </div>
            </div>}
        </React.Fragment>
    );
};

const ContentCreatorSection = () => {
    return (
        <React.Fragment>
            <div style={{ paddingInline: "12rem" }}>
                <div style={{ marginBlockEnd: "2rem" }}>
                    <div className="account-page__details__label">Content Creator</div>
                    <div className="account-page__details__row">
                        <Input
                            className="account-page__details__input"
                            style={{ width: "380px" }}
                            label="Phone Number" />
                        <div style={{ marginBlockStart: "0.9rem" }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    style={{ width: "320px", }}
                                    label="Date of Birth" />
                            </LocalizationProvider>
                        </div>
                    </div>
                    <div className="account-page__details__row">
                        <Input
                            className="account-page__details__input"
                            label="Address" />
                    </div>
                    <div className="account-page__details__row">
                        <div className="account-page__terms-of-service">
                            <TermsOfService />
                        </div>
                    </div>
                    <div
                        className="account-page__details__row"
                        style={{ justifyContent: "flex-start" }}>
                        <Checkbox />
                        <div>I agree to the above terms and conditions</div>
                    </div>
                    <div
                        className="account-page__details__row"
                        style={{ justifyContent: "flex-end" }}>
                        <Button
                            className="account-page__button"
                            style={{ marginBlockStart: "0.7rem", marginInlineEnd: "1rem" }}
                            content="Request" />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

const AccountPage = () => {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const getUserInfo = async () => {
            const response = await GETUserInfoAction(
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
            else
                getUserInfo();
    }, [authContext, navigate]);

    return (
        <React.Fragment>
            <div className="account-page">
                <AccountOverviewSection userInfo={userInfo} />
                <div className="account-page__separator" />
                <AccountDetailsSection userInfo={userInfo} />
                <div className="account-page__separator" />
                <ContentCreatorSection userInfo={userInfo} />
            </div>
        </React.Fragment>
    );
};

export default AccountPage;