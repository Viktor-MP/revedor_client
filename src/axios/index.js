import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: `${API_URL}/api`,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (!originalRequest._retry) {
            originalRequest._retry = true;
            try {
                return await api(originalRequest);
            } catch (retryError) {
                console.error("Retry failed:", retryError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;
