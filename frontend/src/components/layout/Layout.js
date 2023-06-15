import React from "react";

import { useLocation } from "react-router-dom";

import Header from "./Header";
import Sidebar from "./Sidebar";

import "../../styles/Layout.css";

const Layout = (props) => {
    const location = useLocation();
    const isLoginOrRegisterPage = location.pathname !== "/login" && location.pathname !== "/create-new-account"

    return (
        <React.Fragment>
            <div>
                {isLoginOrRegisterPage && <Header />}
                <main className="layout-main">
                    {isLoginOrRegisterPage && <Sidebar />}
                    {props.children}
                </main>
            </div>
        </React.Fragment>
    );
}

export default Layout;