import React from "react";
import Button from "../UI elements/Button";

import { useNavigate } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { RiUser3Line } from "react-icons/ri";

import "../../styles/Sidebar.css";

const SidebarItem = (props) => {
    return (
        <React.Fragment>
            <Button
                className="app-sidebar__item"
                onClick={props.onClick}
                icon={props.icon}
                content={props.content} />
        </React.Fragment>
    );
}

const Sidebar = (props) => {
    const navigate = useNavigate();

    const classes = props.className + " app-sidebar ";

    const OnNavigateHomeHandler = () => {
        return navigate("/");
    }

    const OnNavigateAccountHandler = () => {
        return navigate("/account/")
    }

    return (
        <React.Fragment>
            <div className={classes}>
                <div className="app-sidebar__content">
                    <SidebarItem
                        icon={<GoHome className="app-sidebar__item__icon" />}
                        content="Home"
                        onClick={OnNavigateHomeHandler} />
                    <SidebarItem
                        icon={<RiUser3Line className="app-sidebar__item__icon" />}
                        content="Account"
                        onClick={OnNavigateAccountHandler} />
                </div>
            </div>
        </React.Fragment>
    );
}

export default Sidebar;