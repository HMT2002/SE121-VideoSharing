import React from "react";

import Input from "../UI elements/Input";
import Button from "../UI elements/Button";

const AccountDetails = (props) => {
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

export default AccountDetails;