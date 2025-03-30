import styles from "./Footer.module.scss"

import React from "react"

import { providerPath as path } from "../../../routing/routingPath"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

export const Footer = () => {
    const { t, i18n } = useTranslation()
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                {/* Логотип + Описание */}
                <div className={styles.section}>
                    <h2 className={styles.logo}>{path.shopName}</h2>
                    <p className={styles.description}>{t("footer.desc")}</p>
                </div>

                {/* Навигация */}
                <div className={styles.section}>
                    <h3>{t("footer.nav")}</h3>
                    <ul>
                        <li>
                            <Link to={path.products}>{t("products.main")}</Link>
                        </li>
                        <li>
                            <Link to={path.contacts}>{t("contacts.co")}</Link>
                        </li>
                        <li>
                            <Link to={path.aboutUs}>{t("about.us")}</Link>
                        </li>
                    </ul>
                </div>

                {/* Соцсети */}
                <div className={styles.section}>
                    <h3>{t("footer.social")}</h3>
                    <ul>
                        {Object.entries(path.webUrl).map(
                            ([key, value], index) => (
                                <li key={key}>
                                    <Link to={value} target="_blank">
                                        {key}
                                    </Link>
                                </li>
                            )
                        )}
                    </ul>
                </div>

                {/* Политика */}
                <div className={styles.section}>
                    <h3>{t("footer.legal")}</h3>
                    <ul>
                        <li>
                            <Link to={path.privacy}>
                                {t("footer.privacy_policy")}
                            </Link>
                        </li>
                        <li>
                            <Link to={path.terms}>
                                {t("footer.terms_of_use")}
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Нижний блок */}
            <div className={styles.copyright}>
                <p>© 2025 {path.shopName}. {t("footer.all")}</p>
            </div>
        </footer>
    )
}

export default Footer
