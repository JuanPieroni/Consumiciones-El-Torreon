import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

import { supabase } from "../supabaseClient"
import { useProductos } from "../context/ProductosContext.jsx"

const ProductoExtra = ({ personaSeleccionada, agregarProducto }) => {
    const [nombre, setNombre] = useState("")
    const [precio, setPrecio] = useState("")
    const navigate = useNavigate()
    const { guardarProducto } = useProductos()

    const handleAgregar = async () => {
        if (
            nombre.trim() === "" ||
            precio === "" ||
            isNaN(precio) ||
            Number(precio) <= 0
        ) {
            alert("Por favor ingresá un nombre y un precio válido.")
            return
        }

        const producto = {
            nombre: nombre.trim(),
            precio: Number(precio),
        }

        try {
            await guardarProducto(producto)

            if (personaSeleccionada) {
                agregarProducto({
                    id: Date.now(),
                    ...producto,
                })
                alert(
                    `Producto "${producto.nombre}" agregado a ${personaSeleccionada}.`
                )
            } else {
                alert(`Producto "${producto.nombre}" guardado en la carta.`)
            }

            setNombre("")
            setPrecio("")
            navigate("/")
        } catch {
            alert("Ocurrió un error al guardar el producto.")
        }
    }

    return (
        <div
            style={{
                border: "2px dashed #888",
                padding: "10px",
                margin: "10px",
                backgroundColor: "#f0f0f0",
            }}
        >
            <h2>Agregar producto fuera de carta</h2>
            <p>
                Persona seleccionada: <b>{personaSeleccionada || "Ninguna"}</b>
            </p>
            <div>
                <input
                    type="text"
                    placeholder="Nombre del producto"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Precio"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                />
                <button onClick={handleAgregar}>Agregar Producto</button>
                {!personaSeleccionada && <p>Seleccioná una persona primero</p>}
            </div>
        </div>
    )
}

export default ProductoExtra
