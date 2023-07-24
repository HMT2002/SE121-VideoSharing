import React, { useContext } from "react";

import AuthContext from "../../contexts/auth-context";

import { Link } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { GiToolbox } from "react-icons/gi";
import { RiUser3Line } from "react-icons/ri";


import "../../styles/Sidebar.css";

const SidebarItem = (props) => {
    return (
        <React.Fragment>
            <Link className="app-sidebar__item" to={props.navigateRoute}>
                {props.icon}
                <div>{props.content}</div>
            </Link>
        </React.Fragment>
    );
}

const Sidebar = (props) => {
    const authContext = useContext(AuthContext);
    return (
        <React.Fragment>
            <div className={props.className}>
                <div className="app-sidebar__content">
                    <SidebarItem
                        icon={<GoHome className="app-sidebar__item__icon" />}
                        content="Home"
                        navigateRoute={"/"} />
                        
                    {authContext.isAuthorized && <SidebarItem
                        icon={<RiUser3Line className="app-sidebar__item__icon" />}
                        content="Account"
                        navigateRoute={"/account/" + authContext.username} />}
                    {authContext.role === "content-creator" && <SidebarItem
                        icon={<GiToolbox className="app-sidebar__item__icon" />}
                        content="Workshop"
                        navigateRoute={"/workshop/" + authContext.username} />}
                </div>
            </div>
        </React.Fragment>
    );
}

export default Sidebar;