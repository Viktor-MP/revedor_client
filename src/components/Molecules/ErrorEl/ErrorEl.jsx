// ErrorComponent.jsx
import React from "react"
import "./ErrorEl.scss"

const ErrorEl = () => {
    return (
        <div className="error-container">
            <h1>404</h1>
            <p>Oops! The page you're looking for doesn't exist.</p>
            <a href="/" className="back-home">
                Go Back Home
            </a>
        </div>
    )
}

export default ErrorEl
