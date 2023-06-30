import React, { useEffect, useState } from "react";

import Utils from "../../Utils";
import Input from "../UI elements/Input";
import Button from "../UI elements/Button";
import TermsOfService from "../../TermsOfService";

import dayjs from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Checkbox } from "@mui/material";
import UserAPIs from "../../APIs/user-apis";

const ContentCreatorInfo = (props) => {
    const initialPhoneNumber = props.userInfo.phone ? props.userInfo.phone : "";
    const initialDateOfBirth = props.userInfo.birthday ? dayjs(props.userInfo.birthday) : null;
    const initialAddress = props.userInfo.address ? props.userInfo.address : "";

    const isInitValidPhoneNumber = initialPhoneNumber !== "" ? true : null;
    const isInitValidAddress = initialAddress !== "" ? true : null;

    const successReqMessage = "Your upgrade request has been sent - Waiting for accept";
    const failedReqMessage = "Unexpected error - Failed to sent your upgrade request";

    const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber);
    const [dateOfBirth, setDateOfBirth] = useState(initialDateOfBirth);
    const [address, setAddress] = useState(initialAddress);
    const [moreInfo, setMoreInfo] = useState("");

    const [requestMessage, setRequestMessage] = useState(failedReqMessage);

    const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(isInitValidPhoneNumber);
    const [isValidAddress, setIsValidAddress] = useState(isInitValidAddress);
    const [isTermsAggreed, setIsTermsAggreed] = useState(false);
    const [isRequestSuccess, setIsRequestSuccess] = useState(null);

    const PhoneNumberChangeHandler = (event) => {
        const updatedPhoneNumber = event.target.value;
        setIsValidPhoneNumber(true);
        setPhoneNumber(updatedPhoneNumber);
    }

    const PhoneNumberBlurHandler = () => {
        setIsValidPhoneNumber(Utils.PhoneNumberValidator(phoneNumber));
    }

    const DateOfBirthChangeHandler = (updatedValue) => {
        setDateOfBirth(updatedValue);
    }

    const AddressChangeHandler = (event) => {
        const updatedAddress = event.target.value;
        setIsValidAddress(true);
        setAddress(updatedAddress);
    }

    const AddressBlurHandler = () => {
        setIsValidAddress(!Utils.EmptyValueValidator(address));
    }

    const MoreInfoChangeHandler = (event) => {
        const updatedMoreInfo = event.target.value;
        setMoreInfo(updatedMoreInfo);
    }

    const TermsAggreementChangeHandler = () => {
        setIsTermsAggreed(prev => !prev);
    }

    const UpdateUserInfoOnRequestUpgradeSuccess = async () => {
        try {
            const userUpdatePayload = {
                phone: phoneNumber,
                birthday: dateOfBirth,
                address: address
            };

            const response = await UserAPIs.POSTUpdateUserInfo(
                props.context.username,
                props.context.token,
                userUpdatePayload);

            if (response != null && response.status !== "success") {
                alert("Unexpected error. Failed to update user info!")
            }
        } catch (error) {
            console.log(error);
        }
    }

    const RequestUpgradeToContentCreatorHandler = async () => {
        try {
            const userUpdatePayload = {
                role: props.context.role,
                phone: phoneNumber,
                birthday: dateOfBirth,
                address: address,
                message: moreInfo
            };

            const response = await UserAPIs.POSTRequestUpgradeAccount(
                props.context.username,
                props.context.token,
                userUpdatePayload);

            if (response != null && response.status === "success") {
                setRequestMessage(successReqMessage);
                UpdateUserInfoOnRequestUpgradeSuccess();
                // props.onRequestUpgradeAccount(phoneNumber, dateOfBirth, address);
            } else {
                console.log(response)
                alert("Unexpected error. Failed to request upgrade account!")
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (requestMessage === successReqMessage) setIsRequestSuccess(true);
    }, [requestMessage])

    return (
        <React.Fragment>
            <div style={{ paddingInline: "12rem" }}>
                <div style={{ marginBlockEnd: "2rem" }}>
                    <div className="account-page__details__row" style={{ paddingInline: "0rem" }}>
                        <div className="account-page__details__label">Content Creator</div>
                        {/* <div style={{ color: "#d32f2f", fontWeight: "900", marginInlineStart: "0.3rem" }}>*</div>
                        <div style={{ color: "#b1b1b1", fontSize: "1rem", marginInlineStart: "0.2rem" }}>Required</div> */}
                    </div>
                    <div className="account-page__details__row">
                        <Input
                            className="account-page__details__input"
                            style={{ width: "380px" }}
                            label="Phone Number"
                            value={phoneNumber}
                            isValid={isValidPhoneNumber !== false}
                            onChange={PhoneNumberChangeHandler}
                            onBlur={PhoneNumberBlurHandler}
                            helperText="Invalid phone number" />
                        <div style={{ marginBlockStart: "0.9rem" }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    style={{ width: "320px", }}
                                    label="Date of Birth"
                                    value={dateOfBirth}
                                    onChange={DateOfBirthChangeHandler} />
                            </LocalizationProvider>
                        </div>
                    </div>
                    <div className="account-page__details__row">
                        <Input
                            className="account-page__details__input"
                            label="Address"
                            value={address}
                            isValid={isValidAddress !== false}
                            onChange={AddressChangeHandler}
                            onBlur={AddressBlurHandler}
                            helperText="Address must not be empty!" />
                    </div>
                    {props.context.role !== "content-creator" && <div className="account-page__details__row">
                        <Input
                            className="account-page__details__upgrade-message"
                            label="More Info"
                            value={moreInfo}
                            onChange={MoreInfoChangeHandler}
                            multiline={true}
                            minRows={4} />
                    </div>}
                    <div className="account-page__details__row">
                        <div className="account-page__terms-of-service">
                            <TermsOfService />
                        </div>
                    </div>
                    <div
                        className="account-page__details__row"
                        style={{ justifyContent: "flex-start" }}>
                        <Checkbox
                            checked={props.context.role === "content-creator" || isTermsAggreed}
                            onChange={TermsAggreementChangeHandler}
                            disabled={props.context.role === "content-creator"} />
                        <div>I agree to the above terms and conditions</div>
                    </div>
                    {isRequestSuccess != null &&
                        <div className={isRequestSuccess ?
                            "account-page__request-message__success" :
                            "account-page__request-message__failed"} >
                            {requestMessage}
                        </div>}
                    <div
                        className="account-page__details__row"
                        style={{ justifyContent: "flex-end" }}>
                        {props.context.role !== "content-creator" && !isRequestSuccess && <Button
                            className="account-page__button"
                            style={{ marginBlockStart: "0.7rem", marginInlineEnd: "1rem" }}
                            content="Request"
                            disabled={!(isValidAddress && isValidPhoneNumber && isTermsAggreed)}
                            onClick={RequestUpgradeToContentCreatorHandler} />}
                        {props.context.role !== "content-creator" && !isRequestSuccess && <Button
                            className="account-page__button"
                            style={{ marginBlockStart: "0.7rem", marginInlineEnd: "1rem" }}
                            content="Cancel"
                            onClick={props.onAbortRequestUpgrade} />}
                    </div>
                </div>
            </div>
        </React.Fragment >
    );
}

export default ContentCreatorInfo;