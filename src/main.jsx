// src/main.jsx
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import { ProductosProvider } from "./context/ProductosContext"

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <ProductosProvider>
                <App />
            </ProductosProvider>
        </BrowserRouter>
    </React.StrictMode>
)