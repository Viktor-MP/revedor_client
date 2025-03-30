import React, { useState } from "react";

import Classes from "./Navigation.module.scss";

import { Link } from "react-router-dom";

import { providerPath as path } from "../../../routing/routingPath";
import { List } from "../..";
import { useTranslation } from "react-i18next";
const Navigation = () => {
    const [state, setState] = useState(false);
    const { t, i18n } = useTranslation();

    return (
        <nav>
            <ul>
                <List lf={state} path={path.products}>
                    <Link to={path.products}>{t("products.pr")}</Link>
                </List>
                <List lf={state} path={path.aboutUs}>
                    <Link to={path.aboutUs}>{t("about.us")}</Link>
                </List>
                <List lf={state} path={path.contacts}>
                    <Link to={path.contacts}>{t("contacts.co")}</Link>
                </List>
            </ul>
        </nav>
    );
};

export default Navigation;
