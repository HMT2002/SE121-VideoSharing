import React, { useEffect, useState } from "react";

import Input from "../UI elements/Input";
import Button from "../UI elements/Button";
import UserAPIs from "../../APIs/user-apis";

const EmailValidator = (email) => {
    return email.trim().match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ) !== null && email.trim().length > 0;
}

const AccountDetails = (props) => {
    const initialDisplayName = props.userInfo.username != null ? props.userInfo.username : "";
    const initialEmail = props.userInfo.email != null ? props.userInfo.email : "";

    const [isPasswordChanging, setIsPasswordChanging] = useState(false);
    const [isUserInfoChanged, setIsUserInfoChanged] = useState(false);

    const [isValidDisplayName, setIsValidDisplayName] = useState(true);
    const [isValidEmail, setIsValidEmail] = useState(true);

    const [displayName, setDisplayName] = useState(initialDisplayName);
    const [email, setEmail] = useState(initialEmail);

    const DisplayNameChangeHandler = (event) => {
        const newDisplayName = event.target.value;
        const isValid = newDisplayName.trim().length > 0;
        setIsValidDisplayName(isValid);
        setDisplayName(newDisplayName);
    }

    const EmailChangedHandler = (event) => {
        const newEmail = event.target.value;
        const isValid = EmailValidator(newEmail);
        setIsValidEmail(isValid);
        setEmail(newEmail);
    }

    const UpdateUserInfoHandler = async () => {
        try {
            const userUpdatePayload = { username: displayName, email: email };
            const response = await UserAPIs.POSTUpdateUserInfo(
                props.context.username,
                props.context.token,
                userUpdatePayload);

            if (response != null && response.status === "success") {
                props.context.OnDisplayNameUpdate(displayName);
                alert("Successfully updated user info!");
                // console.log("User info is updated!");
            } else {
                alert("Unexpected error. Failed to update user avatar!")
                // console.log("Unexpected error. Failed to update user avatar!");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const ChangePasswordBtnClickedHandler = () => {
        // console.log("Password changed!");
        setIsPasswordChanging(prev => !prev);
    }

    const ChangePasswordHandler = () => {
        alert("Successfully changed user password!");
        ChangePasswordBtnClickedHandler();
    }

    useEffect(() => {
        const isInfoChanged = displayName !== initialDisplayName || email !== initialEmail;
        setIsUserInfoChanged(isInfoChanged);
    }, [displayName, email, initialDisplayName, initialEmail]);

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
                        {!isPasswordChanging && <Input
                            className="account-page__details__input"
                            style={{ width: "320px" }}
                            label="Password"
                            type="password"
                            value="********"
                            passwordToggle="true"
                            disabled />}
                    </div>
                    {isPasswordChanging && <div className="account-page__details__row">
                        <div style={{ marginBlockEnd: "1.8rem" }}>
                            <Input
                                className="account-page__details__input"
                                style={{ width: "320px" }}
                                type="password"
                                label="Old Password"
                                passwordToggle="true" />
                            <Input
                                className="account-page__details__input"
                                style={{ width: "320px" }}
                                type="password"
                                label="New Password"
                                passwordToggle="true" />
                            <Input
                                className="account-page__details__input"
                                style={{ width: "320px" }}
                                type="password"
                                label="Confirm Password"
                                passwordToggle="true" />
                        </div>
                    </div>}
                    <div className="account-page__details__row" style={{ justifyContent: "flex-end" }}>
                        <Button
                            className="account-page__button"
                            style={{ marginBlockStart: "0.7rem" }}
                            content={!isPasswordChanging ?
                                "Change Password" :
                                "Save Password"}
                            onClick={!isPasswordChanging ?
                                ChangePasswordBtnClickedHandler :
                                ChangePasswordHandler} />
                        {isPasswordChanging && <Button
                            className="account-page__button"
                            style={{ marginBlockStart: "0.7rem", marginInlineStart: "1rem" }}
                            content="Cancel"
                            onClick={ChangePasswordBtnClickedHandler} />}
                    </div>
                </div>
                <div style={{ marginBlockEnd: "2rem" }}>
                    <div className="account-page__details__label">Basic Info</div>
                    <div className="account-page__details__row">
                        <Input
                            className="account-page__details__input"
                            label="Display Name"
                            value={displayName}
                            onChange={DisplayNameChangeHandler}
                            isValid={isValidDisplayName}
                            helperText="Display name must not be empty!" />
                    </div>
                    <div className="account-page__details__row">
                        <Input
                            className="account-page__details__input"
                            label="Email"
                            value={email}
                            onChange={EmailChangedHandler}
                            isValid={isValidEmail}
                            helperText="Invalid email!" />
                    </div>
                    <div
                        className="account-page__details__row"
                        style={{ justifyContent: "flex-end" }}>
                        <Button
                            className="account-page__button"
                            style={{ marginBlockStart: "0.7rem", marginInlineEnd: "1rem" }}
                            content="Save"
                            disabled={!(isUserInfoChanged && isValidDisplayName && isValidEmail)}
                            onClick={UpdateUserInfoHandler} />
                        <Button
                            className="account-page__button"
                            style={{ marginBlockStart: "0.7rem" }}
                            content="Upgrade" />
                    </div>
                </div>
            </div>}
        </React.Fragment>
    );
}

export default AccountDetails;