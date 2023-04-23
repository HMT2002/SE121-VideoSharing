import React from "react";

const Layout = (props) => {

    // for (child in props.children) {
    //     if (props.children[0].type.displayName === "LoginPage" ||
    //         props.children[0].type.displayName === "RegisterPage") {
    //         console.log("is LoginPage");
    //         return (
    //             <React.Fragment>
    //                 {props.children}
    //             </React.Fragment>
    //         );
    //     };
    // }

    return (
        <React.Fragment>
            {props.children}
        </React.Fragment>
    );
}

export default Layout;