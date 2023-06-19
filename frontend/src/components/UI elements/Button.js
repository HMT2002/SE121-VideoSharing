import React from "react";

import "../../styles/Button.css"

const Button = (props) => {
    const classes = "button " + props.className;
    return (
        <button
            className={classes}
            style={props.style}
            onClick={props.onClick}
            type={props.type}
            disabled={props.disabled}>
            {props.icon}
            {props.content}
        </button>
    );
}

export default Button;