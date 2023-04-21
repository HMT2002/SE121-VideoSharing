import React from "react";

import "../styles/Button.css"

const Button = (props) => {
    const classes = "button " + props.className;
    return (
        <button
            className={classes}
            onClick={props.onClick}
            type={props.type}
        >
            {props.children}
        </button>
    );
}

export default Button;