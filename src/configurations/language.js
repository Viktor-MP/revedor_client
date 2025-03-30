import armFlag from "../media/flags/arm.png"
import enFlag from "../media/flags/en.png"
import ruFlag from "../media/flags/ru.png"

import armSFlag from "../media/flags/arm-small.png"
import enSFlag from "../media/flags/en-small.png"
import ruSFlag from "../media/flags/ru-small.png"

import i18n from "../translation/i18n"

const language = {
    en: {
        name: "english",
        country: "England",
        flag: {
            big: enFlag,
            small: enSFlag,
        },
    },
    arm: {
        name: "armenian",
        country: "Armenia",
        flag: {
            big: armFlag,
            small: armSFlag,
        },
    },
    ru: {
        name: "russian",
        country: "Russia",
        flag: {
            big: ruFlag,
            small: ruSFlag,
        },
    },
}

// console.log("hello")
;((lang) => {
    for (const [key, value] of Object.entries(lang)) {
        i18n.store.data[key].language = value
    }
    // console.log(i18n.store)
})(language)
export default i18n
