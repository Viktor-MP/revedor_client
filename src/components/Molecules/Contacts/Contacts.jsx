import React, { useState } from "react"
import Styles from "./Contacts.module.scss"
import classNames from "classnames"
import { sendGmail } from "../../../axios/functions"
import { useTranslation } from "react-i18next"

const Contacts = ({ className }) => {
    const gmailKey = import.meta.env.VITE_GMAIL_API_KEY
    console.log(gmailKey)

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    })
    const [status, setStatus] = useState("")

    const { t, i18n } = useTranslation()
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus(t("form.sending"))

        try {
            const gmail = await sendGmail(formData)
            console.log(gmail)
            setStatus(t("form.send_success"))
            setFormData({
                name: "",
                email: "",
                phone: "",
                message: "",
            })
        } catch (error) {
            setStatus(t("form.sending_error"))
            console.error("Error sending email:", error)
        } finally {
            setTimeout(() => setStatus(""), 2000)
        }
    }

    return (
        <main className={classNames(Styles.contacts, className)}>
            <h2>{t("contacts.feedback_form")}</h2>
            <p>{t("contacts.feedback_desc")}</p>
            <p>{t("contacts.feedback_reason")}</p>

            <form onSubmit={handleSubmit} className={Styles.form}>
                <input
                    type="text"
                    name="name"
                    placeholder={t("form.name")}
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder={t("form.email")}
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    autoComplete="email"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="phone"
                    name="phone"
                    placeholder={t("form.phone")}
                    pattern="^\+?[0-9]{1,3}?[0-9]{7,14}$"
                    autoComplete="tel"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="message"
                    placeholder="Ваше сообщение"
                    value={formData.message}
                    onChange={handleChange}
                    required
                />
                <button type="submit">{t("form.send")}</button>
            </form>

            {status && <p className={Styles.status}>{status}</p>}
        </main>
    )
}

export default Contacts
