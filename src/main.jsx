import { createRoot } from "react-dom/client";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routing/Routing.jsx";
import "./App.scss";
import App from "./App";

createRoot(document.getElementById("root")).render(
    <RouterProvider router={routes}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </RouterProvider>
);
