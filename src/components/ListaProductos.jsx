import React, { useEffect, useState } from "react"
import { supabase } from "../supabaseClient"

import { useProductos } from "../context/ProductosContext.jsx"

const ListaProductos = ({ personaSeleccionada, agregarProducto }) => {
    const { productos } = useProductos()

    const handleAgregar = (producto) => {
        if (!personaSeleccionada) {
            alert("Seleccioná una persona primero")
            return
        }
        agregarProducto(producto)
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
            <h3>Lista de Productos</h3>
            <div>
                {productos.map((producto) => (
                    <button
                        key={producto.id}
                        onClick={() => handleAgregar(producto)}
                    >
                        {producto.nombre} {/*-  ${producto.precio} */}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default ListaProductos
