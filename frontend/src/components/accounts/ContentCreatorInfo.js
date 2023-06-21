import React from "react";

import Input from "../UI elements/Input";
import Button from "../UI elements/Button";
import TermsOfService from "../../TermsOfService";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Checkbox } from "@mui/material";

const ContentCreatorInfo = () => {
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

export default ContentCreatorInfo;