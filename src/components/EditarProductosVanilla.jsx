import React, { useEffect, useState } from "react"
import { supabase } from "../supabaseClient"
import { showToast } from "./Toast"

const EditarProductosVanilla = () => {
    const [productosOriginales, setProductosOriginales] = useState([])
    const [productosEditados, setProductosEditados] = useState([])
    const [filtro, setFiltro] = useState("")

    useEffect(() => {
        const fetchProductos = async () => {
            const { data, error } = await supabase
                .from("productos")
                .select("*")
                .order("nombre", { ascending: true })

            if (!error) {
                setProductosOriginales(data)
                setProductosEditados(data)
            }
        }

        fetchProductos()
    }, [])

    const handleChange = (id, field, value) => {
        const nuevos = productosEditados.map((prod) =>
            prod.id === id ? { ...prod, [field]: value } : prod
        )
        setProductosEditados(nuevos)
    }

    const guardarCambios = async (producto) => {
        const productoOriginal = productosOriginales.find(
            (p) => p.id === producto.id
        )
        const datosActualizados = {
            id: producto.id,
            nombre: producto.nombre !== undefined ? producto.nombre : productoOriginal.nombre,
            precio: producto.precio !== undefined ? producto.precio : productoOriginal.precio,
            categoria: producto.categoria !== undefined ? producto.categoria.toLowerCase() : productoOriginal.categoria.toLowerCase(),
        }

        const { error } = await supabase
            .from("productos")
            .upsert([datosActualizados])

        if (error) {
            showToast("No se pudo guardar el producto", "error")
        } else {
            showToast("Producto actualizado con éxito", "success")
            setProductosOriginales((prev) =>
                prev.map((p) => (p.id === producto.id ? datosActualizados : p))
            )
        }
    }

    const eliminarProducto = async (id) => {
        if (!window.confirm("¿Estás seguro? Esta acción eliminará el producto definitivamente.")) {
            return
        }

        const { error } = await supabase
            .from("productos")
            .delete()
            .eq("id", id)

        if (error) {
            showToast("No se pudo eliminar el producto", "error")
        } else {
            setProductosOriginales((prev) => prev.filter((p) => p.id !== id))
            setProductosEditados((prev) => prev.filter((p) => p.id !== id))
            showToast("Producto eliminado con éxito", "success")
        }
    }

    const productosFiltrados = productosEditados.filter(
        (prod) =>
            prod.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
            prod.categoria.toLowerCase().includes(filtro.toLowerCase())
    )

    return (
        <div className="paper">
            <h2 style={{ marginBottom: '24px', color: '#424242' }}>
                Editar productos
            </h2>

            <input
                className="input"
                placeholder="Buscar producto"
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                style={{ marginBottom: '24px' }}
            />

            {filtro.trim() && productosFiltrados.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {productosFiltrados.map((prod) => (
                        <div key={prod.id} className="card">
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <input
                                    className="input"
                                    placeholder="Nombre"
                                    value={prod.nombre}
                                    onChange={(e) => handleChange(prod.id, "nombre", e.target.value)}
                                />
                                <input
                                    className="input"
                                    type="number"
                                    placeholder="Precio"
                                    value={prod.precio}
                                    onChange={(e) => handleChange(prod.id, "precio", e.target.value)}
                                />
                                <input
                                    className="input"
                                    placeholder="Categoría"
                                    value={prod.categoria}
                                    onChange={(e) => handleChange(prod.id, "categoria", e.target.value)}
                                />
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => guardarCambios(prod)}
                                    >
                                        Guardar
                                    </button>
                                    <button
                                        className="btn"
                                        style={{ background: '#ef4444', color: 'white' }}
                                        onClick={() => eliminarProducto(prod.id)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : filtro.trim() ? (
                <p style={{ color: '#616161' }}>
                    No se encontraron productos que coincidan.
                </p>
            ) : (
                <p style={{ color: '#616161' }}>
                    Ingresá un nombre o categoría para buscar productos.
                </p>
            )}
        </div>
    )
}

export default EditarProductosVanilla