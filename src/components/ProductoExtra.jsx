import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./ProductoExtra.module.css"
import { insertarProducto } from "../supabaseClient.js"

const ProductoExtra = ({ personaSeleccionada, agregarProducto }) => {
    const [nombre, setNombre] = useState("")
    const [precio, setPrecio] = useState("")
    const navigate = useNavigate()

    const handleAgregar = async () => {
        if (!personaSeleccionada) {
            alert("Primero seleccioná una persona para agregar el producto.")
            return
        }
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
            id: Date.now(), // este es el ID local
            nombre: nombre.trim(),
            precio: Number(precio),
        }

        // Primero lo agregás al consumo local (como venías haciendo)
        agregarProducto(producto)

        // Ahora intentás guardarlo en Supabase
        try {
            await insertarProducto(producto.nombre, producto.precio)
            console.log("Producto guardado en Supabase")
        } catch (error) {
            console.error("Error al guardar en Supabase", error)
            // Podés mostrar un mensaje o dejarlo en silencio
        }

        setNombre("")
        setPrecio("")
        alert(
            `Producto "${producto.nombre}" agregado a ${personaSeleccionada}.`
        )
        navigate("/") // Volver al home
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.titulo}>Agregar producto fuera de carta</h2>
            <p>
                Persona seleccionada: <b>{personaSeleccionada || "Ninguna"}</b>
            </p>
            <div className={styles.form}>
                <input
                    className={styles.input}
                    type="text"
                    placeholder="Nombre del producto"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <input
                    className={styles.input}
                    type="number"
                    placeholder="Precio"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                />
                <button className={styles.button} onClick={handleAgregar}>
                    Agregar Producto
                </button>
                {!personaSeleccionada && (
                    <p className={styles.mensaje}>
                        Seleccioná una persona primero
                    </p>
                )}
            </div>
        </div>
    )
}

export default ProductoExtra
