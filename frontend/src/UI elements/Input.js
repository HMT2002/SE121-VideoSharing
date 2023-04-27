import React, { useEffect, useImperativeHandle, useRef, useState } from "react";

import { TextField } from "@mui/material";

import "../styles/Input.css"

const Input = React.forwardRef((props, ref) => {
    const [isValid, setIsValid] = useState(true);

    const inputRef = useRef();

    useEffect(() => {
        setIsValid(props.isValid);
    }, [props.isValid, props.value]);

    const ThrowError = () => {
        setIsValid(false);
    };

    const GetValue = () => {
        return inputRef.current.value;
    }

    useImperativeHandle(ref, () => {
        return {
            throwError: ThrowError,
            getValue: GetValue
        }
    })

    let textFieldProps =
    {
        inputRef: inputRef,
        type: props.type,
        variant: props.variant,
        label: props.label,
        value: props.value,
        helperText: !isValid ? props.helperText : "",
        defaultValue: props.defaultValue,
        onChange: props.onChange,
        onBlur: props.onBlur,
        onFocus: props.onFocus
    };

    if (isValid === false) textFieldProps = { ...textFieldProps, error: true }

    return (
        <div className={props.className}>
            <TextField className="input__text-field" {...textFieldProps} />
        </div>
    );
});

export default Input;