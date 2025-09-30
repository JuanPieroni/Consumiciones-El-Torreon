import React, { useState } from "react"
import { supabase } from "../supabaseClient"
import { showToast } from "./Toast"

const FormularioProductoVanilla = () => {
    const [nombre, setNombre] = useState("")
    const [precio, setPrecio] = useState("")
    const [categoria, setCategoria] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!nombre.trim() || !precio || !categoria.trim()) {
            showToast("Todos los campos son obligatorios", "error")
            return
        }

        const { error } = await supabase
            .from("productos")
            .upsert([
                {
                    nombre: nombre.trim(),
                    precio: parseFloat(precio),
                    categoria: categoria.trim(),
                },
            ])

        if (error) {
            console.error("Error al agregar producto:", error.message)
            showToast("Error al agregar el producto", "error")
            return
        }

        showToast("Producto agregado con éxito!", "success")
        setNombre("")
        setPrecio("")
        setCategoria("")
    }

    return (
        <div className="paper">
            <h2 style={{ textAlign: 'center', marginBottom: '24px', color: '#424242' }}>
                Agregar nuevo producto
            </h2>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <input
                    className="input"
                    placeholder="Nombre del producto"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    autoFocus
                />

                <input
                    className="input"
                    type="number"
                    placeholder="Precio"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                    min="0"
                    step="0.01"
                />

                <input
                    className="input"
                    placeholder="Categoría (ej: Bebidas, Postres)"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                />

                <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ 
                        marginTop: '8px',
                        background: 'linear-gradient(135deg, #00bcd4 0%, #8bc34a 100%)',
                        border: 'none',
                        padding: '12px 24px',
                        fontSize: '16px'
                    }}
                >
                    Agregar
                </button>
            </form>
        </div>
    )
}

export default FormularioProductoVanilla