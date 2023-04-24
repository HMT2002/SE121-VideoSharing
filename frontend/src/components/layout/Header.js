import React, { useContext } from "react";

import { Link, useNavigate } from "react-router-dom";
import { IoLogInOutline, IoLogOut, IoMenu } from "react-icons/io5";
import { RiUserAddFill } from "react-icons/ri";

import Button from "../../UI elements/Button";
import SearchBar from "./SearchBar";
import AuthContext from "../../contexts/auth-context";

import "../../styles/Header.css"

const Header = (props) => {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    const LogoutHandler = () => {
        authContext.OnLoggedOut();
        navigate("/login");
    }

    return (
        <React.Fragment>
            <header className="app-header">
                <Button className="app-header__burger-menu__button">
                    <IoMenu className="app-header__burger-menu__button icon" />
                </Button>
                <Link className="app-header__logo" to="/">Logo</Link>
                <SearchBar />
                {/*Unauthorized*/}
                {!authContext.isLoggedIn && <React.Fragment>
                    <Link className="app-header__unauthorized login" to="/login">
                        <IoLogInOutline className="app-header__unauthorized__icon login" />
                        Login
                    </Link>
                    <Link className="app-header__unauthorized register" to="/create-new-account">
                        <RiUserAddFill className="app-header__unauthorized__icon register" />
                        Register
                    </Link>
                </React.Fragment>}
                {/*Authorized*/}
                {authContext.isLoggedIn && <React.Fragment>
                    <img
                        className="app-header__authorized-avatar"
                        src="https://aniyuki.com/wp-content/uploads/2022/03/aniyuki-cute-anime-avatar-profile-picture-14.jpg"
                        alt="avatar" />
                    <Button
                        className="app-header__authorized-logout"
                        onClick={LogoutHandler}
                    >
                        <IoLogOut className="app-header__authorized-logout icon" />
                        Logout
                    </Button>
                </React.Fragment>}
            </header>
            {props.children}
        </React.Fragment>
    )
};

export default Header;