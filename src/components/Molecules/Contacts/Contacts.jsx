import React, { useEffect, useState } from "react"
import Styles from "./Contacts.module.scss"
import classNames from "classnames"
import { sendGmail } from "../../../axios/functions"

// const sendEmail = async () => {
//     const response = await fetch("http://localhost:5000/api/send_email", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//             from: "http://localhost:5000.com",
//             to: "viktormelikparsadanyan.com",
//             subject: "Hello from Resend",
//             html: <strong>Welcome!</strong>,
//         }),
//     })

//     const data = await response.json()
//     console.log(data)
// }

const Contacts = ({ className }) => {
    const gmailKey = import.meta.env.VITE_GMAIL_API_KEY
    console.log(gmailKey)

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    })
    const [status, setStatus] = useState("")

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus("Отправка...")

        try {
            const gmail = await sendGmail(formData)
            console.log(gmail)
            // Здесь можно интегрировать API для отправки в Gmail, Telegram и другие сервисы
            // Например, отправка на сервер, который разошлёт сообщения по нужным каналам

            setTimeout(() => setStatus("Сообщение отправлено!"), 2000) // Заглушка для имитации запроса
        } catch (error) {
            setStatus("Ошибка отправки")
        }
    }

 
    return (
        <main
            className={classNames({
                [Styles["contacts"]]: !className,
            })}
        >
            <h2>Свяжитесь с нами</h2>
            <p>
                Вы можете написать нам по электронной почте, в Telegram или
                через форму ниже.
            </p>

            <div className={Styles.contactInfo}>
                <p>
                    <strong>Email:</strong> yourshop@gmail.com
                </p>
                <p>
                    <strong>Telegram:</strong>{" "}
                    <a href="https://t.me/yourshop" target="_blank">
                        @yourshop
                    </a>
                </p>
            </div>

            <form onSubmit={handleSubmit} className={Styles.form}>
                <input
                    type="text"
                    name="name"
                    placeholder="Ваше имя"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Ваш Email"
                    value={formData.email}
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
                <button type="submit">Отправить</button>
            </form>

            {status && <p className={Styles.status}>{status}</p>}
        </main>
    )
}

export default Contacts
