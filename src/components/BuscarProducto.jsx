import React, { useEffect, useState } from "react"
import { supabase } from "../supabaseClient"
import { capitalize } from "../utils/textUtils"
import { showToast } from "./Toast"

const BuscarProducto = ({ personaSeleccionada, agregarProducto }) => {
    const [productos, setProductos] = useState([])
    const [filtro, setFiltro] = useState("")
    const [feedbackButtons, setFeedbackButtons] = useState(new Set())

    useEffect(() => {
        const fetchProductos = async () => {
            const { data, error } = await supabase
                .from("productos")
                .select("*")
                .order("nombre", { ascending: true })

            if (!error) {
                setProductos(data)
            }
        }

        fetchProductos()
    }, [])

    const productosFiltrados = productos.filter(
        (prod) =>
            prod.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
            (prod.categoria || "")
                .toLowerCase()
                .includes(filtro.toLowerCase()) ||
            (prod.subcategoria || "")
                .toLowerCase()
                .includes(filtro.toLowerCase()) ||
            (prod.precio || "").toString().includes(filtro)
    )

    const handleAgregarConFeedback = (producto) => {
        if (!personaSeleccionada) {
            showToast("⚠️ Selecciona una persona primero", "warning")
            return
        }
        
        // Agregar producto
        agregarProducto(producto)
        
        // Feedback visual
        setFeedbackButtons(prev => new Set([...prev, producto.id]))
        showToast(`${capitalize(producto.nombre)} agregado a ${personaSeleccionada}`, "success")
        
        // Quitar feedback después de 1 segundo
        setTimeout(() => {
            setFeedbackButtons(prev => {
                const newSet = new Set(prev)
                newSet.delete(producto.id)
                return newSet
            })
        }, 1000)
    }

    return (
        <>
            <h2 style={{
                textAlign: 'center',
                marginBottom: '24px',
                color: '#424242',
                fontWeight: 'bold'
            }}>
                ♦ Buscar Productos ♦
            </h2>
            <div className={`paper ${!personaSeleccionada ? 'overlay-disabled' : ''}`}>
                <input
                    className="input"
                    placeholder="Buscar producto o categoria"
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                    onFocus={() => setFiltro("")}
                />

            {filtro.trim() && productosFiltrados.length > 0 ? (
                <div className="mt-4 flex flex-col gap-2">
                    {productosFiltrados.map((prod) => (
                        <div
                            key={prod.id}
                            className="card"
                            style={{
                                backgroundColor: "hsla(90, 29%, 95%, 0.87)",
                                border: "1px solid #e0e0e0"
                            }}
                        >
                            <h3 style={{ fontWeight: "bold", marginBottom: "8px" }}>
                                {capitalize(prod.nombre)}
                            </h3>
                            <p style={{
                                color: "#5e72e4",
                                fontWeight: "bold",
                                fontSize: "0.9rem",
                                margin: "4px 0"
                            }}>
                                ${prod.precio}
                            </p>
                            <p style={{
                                color: "#616161",
                                fontWeight: "bold",
                                fontSize: "0.8rem",
                                margin: "4px 0"
                            }}>
                                {capitalize(prod.categoria)}
                            </p>
                            {prod.subcategoria && (
                                <p style={{
                                    color: "#616161",
                                    fontSize: "0.8rem",
                                    margin: "4px 0"
                                }}>
                                    {capitalize(prod.subcategoria)}
                                </p>
                            )}

                            <button
                                className={`btn btn-text ${
                                    feedbackButtons.has(prod.id) ? 'btn-success-feedback' : ''
                                }`}
                                style={{
                                    marginTop: "8px",
                                    color: feedbackButtons.has(prod.id) ? "white" : "hsla(8, 86%, 46%, 0.51)",
                                    border: "1px solid black",
                                    cursor: !personaSeleccionada ? "not-allowed" : "pointer",
                                    opacity: !personaSeleccionada ? 0.5 : 1
                                }}
                                onClick={() => handleAgregarConFeedback(prod)}
                                disabled={!personaSeleccionada}
                                title={!personaSeleccionada ? "Selecciona una persona primero" : ""}
                            >
                                {feedbackButtons.has(prod.id) 
                                    ? `✓ Agregado` 
                                    : personaSeleccionada 
                                        ? `Agregar a ${personaSeleccionada}` 
                                        : "Selecciona persona"
                                }
                            </button>
                        </div>
                    ))}
                </div>
            ) : filtro.trim() ? (
                <p style={{ marginTop: "16px", color: "#616161" }}>
                    No se encontraron productos que coincidan.
                </p>
            ) : (
                !personaSeleccionada && (
                    <div className="warning-message" style={{ marginTop: "16px" }}>
                        🔍 Busca productos después de seleccionar una persona
                    </div>
                )
            )}
            </div>
        </>
    )
}

export default BuscarProducto
