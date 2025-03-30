import React from "react";
import { useTranslation } from "react-i18next";

import Classes from "./AboutUs.module.scss";

const AboutUs = () => {
    const { t, i18n } = useTranslation();
    let description =
        i18n.store.data[i18n.resolvedLanguage].translation.about
            .brand_description;
    description = description.split(",");

    return (
        <main className={[Classes["main"]]}>
            <h2>{t("about.us")}</h2>

            <div>
                <ul className={[Classes["container_"]]}>
                    {description.map((desc) => {
                        return (
                            <li className={[Classes["description"]]} key={desc}>
                                {desc}
                            </li>
                        );
                    })}
                </ul>
                <p>{t("about.guide")}</p>
            </div>
            <p>{t("about.history")}</p>
        </main>
    );
};

export default AboutUs;
