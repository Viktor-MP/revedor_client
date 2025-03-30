import api from "."

function handleApiError(error, customMessage = "An error occurred") {
    if (error.response) {
        console.error(
            `${customMessage}:`,
            error.response.status,
            error.response.data
        )
        return {
            success: false,
            message: error.response.data?.message || customMessage,
        }
    } else {
        console.error(`${customMessage}: Network Error -`, error.message)
        return {
            success: false,
            message: "Network error. Please try again later.",
        }
    }
}

async function fetchData(page = 1, curr = "amd", lang = "ru") {
    try {
        const response = await api.get("/sellerProducts", {
            params: { page, curr, lang },
        })
        return response.data
    } catch (error) {
        throw handleApiError(error, "Failed to fetch brand products")
    }
}

async function getCardInfo(id) {
    try {
        const response = await api.get("/cardInfo", { params: { id } })
        return response.data
    } catch (error) {
        if (error.response?.status === 404) {
            console.warn("Card not found:", id)
            throw { success: false, message: "Card not found." }
        }
        throw handleApiError(error, "Failed to fetch card info")
    }
}

async function sendGmail(email) {
    console.log(email)
    try {
        const response = await api.post("/sendGmail", {
            name: email.name,
            userEmail: email.email,
            subject: `Hello from ${email.name}`,
            message: email.message,
        })

        return response.data
    } catch (error) {
        throw handleApiError(error, "Failed to send email")
    }
}
export { fetchData, getCardInfo, sendGmail }
