import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./ProductoExtra.module.css"
import { supabase } from "../supabaseClient"

const ProductoExtra = ({ personaSeleccionada, agregarProducto }) => {
    const [nombre, setNombre] = useState("")
    const [precio, setPrecio] = useState("")
    const navigate = useNavigate()

    const handleAgregar = async () => {
        // 1. Validación básica
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
            // 2. Buscar si ya existe el producto por nombre
            const { data: existente, error: errorExistente } = await supabase
                .from("productos")
                .select("*")
                .eq("nombre", producto.nombre)
                .maybeSingle()

            if (errorExistente) throw errorExistente

            if (!existente) {
                // 3. Si no existe, lo insertamos
                const { error: errorInsert } = await supabase
                    .from("productos")
                    .insert([producto])

                if (errorInsert) throw errorInsert
            } else if (existente.precio !== producto.precio) {
                // 4. Si existe pero con otro precio, lo actualizamos
                const { error: errorUpdate } = await supabase
                    .from("productos")
                    .update({ precio: producto.precio })
                    .eq("nombre", producto.nombre)

                if (errorUpdate) throw errorUpdate
            }

            // 5. Si hay persona seleccionada, se lo asignamos también a esa persona
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

            // 6. Limpiar formulario y volver al inicio
            setNombre("")
            setPrecio("")
            navigate("/")
        } catch (err) {
            console.error("Error al agregar producto:", err.message)
            alert("Ocurrió un error al guardar el producto.")
        }
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
