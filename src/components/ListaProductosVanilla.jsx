import React, { useMemo } from "react"
import { useProductos } from "../context/ProductosContext"
import { showToast } from "./Toast"
import { capitalize } from "../utils/textUtils"
import "./ListaProductosVanilla.css"

const ListaProductosVanilla = React.memo(({ personaSeleccionada, agregarProducto }) => {
    const { productos } = useProductos()
    const [expanded, setExpanded] = React.useState(false)
    const [feedbackCards, setFeedbackCards] = React.useState(new Set())

    const handleAgregar = (producto) => {
        if (!personaSeleccionada) {
            showToast("⚠️ Selecciona una persona antes de agregar productos", "warning")
            return
        }
        
        // Agregar producto
        agregarProducto(producto)
        
        // Feedback visual
        setFeedbackCards(prev => new Set([...prev, producto.id]))
        showToast(`${capitalize(producto.nombre)} agregado a ${personaSeleccionada}`, "success")
        
        // Quitar feedback después de 800ms
        setTimeout(() => {
            setFeedbackCards(prev => {
                const newSet = new Set(prev)
                newSet.delete(producto.id)
                return newSet
            })
        }, 800)
    }

    const productosPorCategoria = useMemo(() => {
        return productos.reduce((acc, producto) => {
            const categoria = producto.categoria || "Otros"

            if (!acc[categoria])
                acc[categoria] = { productos: [], subcategorias: {} }

            if (producto.subcategoria) {
                if (!acc[categoria].subcategorias[producto.subcategoria]) {
                    acc[categoria].subcategorias[producto.subcategoria] = []
                }
                acc[categoria].subcategorias[producto.subcategoria].push(producto)
            } else {
                acc[categoria].productos.push(producto)
            }

            return acc
        }, {})
    }, [productos])

    const toggleCategory = (categoria) => {
        setExpanded(expanded === categoria ? false : categoria)
    }

    return (
        <div className="lista-productos">
            <h2 className="carta-title">
                🍽️ CARTA 🍴
            </h2>
            
            {!personaSeleccionada && (
                <div className="warning-message">
                    👆 Selecciona una persona arriba para agregar productos
                </div>
            )}
            
            {Object.entries(productosPorCategoria).map(([categoria, subcategorias]) => (
                <div key={categoria} className="categoria-accordion">
                    <button 
                        className={`categoria-header ${expanded === categoria ? 'expanded' : ''}`}
                        onClick={() => toggleCategory(categoria)}
                    >
                        <span>{capitalize(categoria).toUpperCase()}</span>
                        <span className="expand-icon">{expanded === categoria ? '−' : '+'}</span>
                    </button>
                    
                    {expanded === categoria && (
                        <div className="categoria-content">
                            {/* Productos directos */}
                            {subcategorias.productos.length > 0 && (
                                <div className={`productos-grid ${!personaSeleccionada ? 'overlay-disabled' : ''}`}>
                                    {subcategorias.productos.map((producto) => (
                                        <div
                                            key={producto.id}
                                            className={`producto-card ${
                                                feedbackCards.has(producto.id) ? 'card-added-feedback' : ''
                                            }`}
                                            onClick={() => handleAgregar(producto)}
                                            style={{
                                                cursor: !personaSeleccionada ? 'not-allowed' : 'pointer',
                                                position: 'relative'
                                            }}
                                            title={!personaSeleccionada ? "Selecciona una persona primero" : ""}
                                        >
                                            <div className="producto-nombre">{capitalize(producto.nombre)}</div>
                                            <div className="producto-precio">${producto.precio}</div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Subcategorías */}
                            {Object.entries(subcategorias.subcategorias).map(([subcategoria, items]) => (
                                <details key={subcategoria} className="subcategoria">
                                    <summary className="subcategoria-header">
                                        {capitalize(subcategoria)}
                                    </summary>
                                    <div className={`productos-grid ${!personaSeleccionada ? 'overlay-disabled' : ''}`}>
                                        {items.map((producto) => (
                                            <div
                                                key={producto.id}
                                                className={`producto-card ${
                                                    feedbackCards.has(producto.id) ? 'card-added-feedback' : ''
                                                }`}
                                                onClick={() => handleAgregar(producto)}
                                                style={{
                                                    cursor: !personaSeleccionada ? 'not-allowed' : 'pointer',
                                                    position: 'relative'
                                                }}
                                                title={!personaSeleccionada ? "Selecciona una persona primero" : ""}
                                            >
                                                <div className="producto-nombre">{capitalize(producto.nombre)}</div>
                                                <div className="producto-precio">${producto.precio}</div>
                                            </div>
                                        ))}
                                    </div>
                                </details>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
})

export default ListaProductosVanilla