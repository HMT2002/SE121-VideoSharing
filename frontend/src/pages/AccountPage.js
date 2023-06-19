import React, { useEffect } from "react";

import Input from "../components/UI elements/Input";
import Button from "../components/UI elements/Button";
import Checkbox from '@mui/material/Checkbox';
import TermsOfService from "../TermsOfService";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { GETUserInfoAction } from "../APIs/user-apis";

import "../styles/AccountPage.css";

const AccountOverviewSection = () => {
    return (
        <React.Fragment>
            <div className="account-page__overview">
                <img
                    className="account-page__overview__avatar"
                    src="https://aniyuki.com/wp-content/uploads/2022/03/aniyuki-cute-anime-avatar-profile-picture-14.jpg"
                    alt="Avatar" />
                <div>
                    <div className="account-page__overview__username">Username</div>
                    <div className="account-page__overview__account">Account</div>
                    <div className="account-page__overview__account">Email</div>
                </div>
            </div>
        </React.Fragment>
    );
};

const AccountDetailsSection = () => {
    return (
        <React.Fragment>
            <div style={{ paddingInline: "12rem" }}>
                <div style={{ marginBlockEnd: "2rem" }}>
                    <div className="account-page__details__label">Account</div>
                    <div className="account-page__details__row">
                        <Input
                            className="account-page__details__input"
                            style={{ width: "320px" }}
                            label="Username"
                            defaultValue={"Username"}
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
                            defaultValue={"Display Name"} />
                    </div>
                    <div className="account-page__details__row">
                        <Input
                            className="account-page__details__input"
                            label="Email"
                            defaultValue={"Email"} />
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
            </div>
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
    useEffect(() => {

    }, [])

    return (
        <React.Fragment>
            <div className="account-page">
                <AccountOverviewSection />
                <div className="account-page__separator" />
                <AccountDetailsSection />
                <div className="account-page__separator" />
                <ContentCreatorSection />
            </div>
        </React.Fragment>
    );
};

export default AccountPage;