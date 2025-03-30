import Classes from "./Header.module.scss";

import React from "react";

import Logo from "../../../media/Logo/Logo.png";
import { providerPath as path } from "../../../routing/routingPath.js";
import { Lang_drop,  Navigation } from "../../";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className={[Classes["header"]]}>
            <h1 className={[Classes["header__logo"]]}>
                {" "}
                <Link to={path.products}>
                    <img width={"100%"} src={Logo} alt="Logo Reve d'Or" />{" "}
                </Link>
            </h1>

            <Navigation />
            <Lang_drop />
        </header>
    );
};

export default Header;
