import React from "react";

import { useLocation } from "react-router-dom";

import Header from "./Header";

const Layout = (props) => {
    const location = useLocation();

    return (
        <React.Fragment>
            {
                location.pathname !== "/login" &&
                location.pathname !== "/create-new-account" &&
                <Header />
            }
            <main>
                {props.children}
            </main>
        </React.Fragment>
    );
}

export default Layout;