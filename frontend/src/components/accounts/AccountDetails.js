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
                alert("User info was successfully updated!")
                // console.log("User info is updated!");
            } else {
                console.log("Unexpected error. Failed to update user avatar!");
            }
        } catch (error) {
            console.log(error);
        }
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
                            disabled={!isUserInfoChanged && isValidDisplayName && isValidEmail}
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