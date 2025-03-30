import React, { useState } from "react"
import Classes from "./LangDrop.module.scss"

import classNames from "classnames"

import i18n from "../../../configurations/language"
import { providerPath as path } from "../../../routing/routingPath"
import { useLocation } from "react-router-dom"

const Lang_drop = ({ lang_class }) => {
    const location = useLocation() // Provides location information
    const [isOpen, setIsOpen] = useState(false)

    const lang_data = i18n.store.data
    
    const drop_changer = () => setIsOpen(!isOpen)
    const changeLanguageHandler = (lang) => {
        setIsOpen(false)

        if (location.pathname === path.aboutUs) window.location.reload()
        i18n.changeLanguage(lang)
    }
    const alt_of_image = (resLang) => {
        return ` flag of ${lang_data[resLang].language.country}`
    }

    return (
        <section
            className={` ${classNames({
                [lang_class]: lang_class,
                [Classes["lang_drop"]]: !lang_class,
                [Classes["section"]]: !lang_class,
            })}`}
            onMouseEnter={drop_changer}
            onMouseLeave={drop_changer}
            // tabIndex={0}
        >
            <div>
                <img
                    width={50}
                    src={lang_data[i18n.resolvedLanguage].language.flag.small}
                    alt={alt_of_image(i18n.resolvedLanguage)}
                />
                <span>{lang_data[i18n.resolvedLanguage].language.name}</span>
            </div>
            <div
                className={`${[Classes["drop"]]} ${classNames({
                    [Classes["open"]]: isOpen,
                })}`}
            >
                {Object.entries(lang_data).map(([key, value]) => {
                    if (key !== i18n.resolvedLanguage) {
                        return (
                            <div
                                key={key}
                                className={classNames({
                                    [Classes["option"]]: !lang_class,
                                })}
                                onClick={() => {
                                    changeLanguageHandler(key)
                                }}
                            >
                                <img
                                    width={50}
                                    src={value.language.flag.small}
                                    alt={alt_of_image(key)}
                                />
                                <span>{value.language.name}</span>
                            </div>
                        )
                    }
                })}
            </div>
        </section>
    )
}

export default Lang_drop
