// src/main.jsx
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import { ProductosProvider } from "./context/ProductosContext"
import { registerSW } from "./utils/serviceWorker"

// Register Service Worker
registerSW()

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <ProductosProvider>
                <App />
            </ProductosProvider>
        </BrowserRouter>
    </React.StrictMode>
)