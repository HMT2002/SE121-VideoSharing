import React, { useEffect, useImperativeHandle, useState } from "react";

import { TextField } from "@mui/material";

import "../styles/Input.css"

const Input = React.forwardRef((props, ref) => {
    const [isValid, setIsValid] = useState(true);

    useEffect(() => {
        setIsValid(props.isValid);
    }, [props.isValid, props.value]);

    const error = () => {
        setIsValid(false);
    };

    useImperativeHandle(ref, () => {
        return {
            throwError: error
        }
    })

    let textFieldProps =
    {
        type: props.type,
        variant: props.variant,
        label: props.label,
        value: props.value,
        helperText: !isValid ? props.helperText : "",
        defaultValue: props.defaultValue,
        onChange: props.onChange,
        onBlur: props.onBlur,
    };

    if (isValid === false) textFieldProps = { ...textFieldProps, error: true }

    return (
        <div className={props.className}>
            <TextField className="input__text-field" {...textFieldProps} />
        </div>
    );
});

export default Input;