import React from "react";

import { TextField } from "@mui/material";

import "../styles/Input.css"

const Input = (props) => {
    const textFieldProps =
    {
        type: props.type,
        variant: props.variant,
        label: props.label,
        value: props.value,
        helperText: props.helperText,
        defaultValue: props.defaultValue,
        onChange: props.onChange,
    };

    return (
        <div className={props.className}>
            <TextField className="input__text-field" {...textFieldProps} />
        </div>
    );
}

export default Input;