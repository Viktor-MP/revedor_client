import { useState } from "react";
import "./ErrorMessage.scss";
// import { AlertTriangle } from "lucide-react"; // Importing an icon (optional)

const ErrorMessage = ({ message }) => {
    const [visible, setVisible] = useState(true);

    if (!visible) return null; // Hide component if dismissed

    return (
        <div className="error-message">
            {/* <AlertTriangle className="error-icon" size={24} /> */}
            <span>
                {message || "Something went wrong. Please try again later."}
              
            </span>
            <button className="close-btn" onClick={() => setVisible(false)}>
                ×
            </button>
        </div>
    );
};

export default ErrorMessage;
