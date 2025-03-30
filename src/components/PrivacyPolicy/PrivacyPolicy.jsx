import styles from "./PrivacyPolicy.module.scss"

import React from "react"

const PrivacyPolicy = () => {
    return (
        <main className={styles.privacyPolicy}>
            <h2>Политика конфиденциальности</h2>
            <p>
                Мы уважаем вашу конфиденциальность и стремимся защищать ваши
                личные данные. Ознакомьтесь с нашей политикой для понимания, как
                мы собираем, используем и защищаем информацию.
            </p>

            <h3>Сбор информации</h3>
            <p>
                Мы можем собирать персональные данные, такие как ваше имя, email
                и другие сведения, предоставленные вами при взаимодействии с
                нашим сайтом.
            </p>

            <h3>Использование данных</h3>
            <p>
                Ваши данные используются для улучшения качества обслуживания,
                связи с вами и отправки актуальной информации.
            </p>

            <h3>Защита информации</h3>
            <p>
                Мы принимаем меры безопасности для защиты ваших данных от
                несанкционированного доступа.
            </p>
        </main>
    )
}

export default PrivacyPolicy
