import React, { useMemo } from "react"
import { useProductos } from "../context/ProductosContext"
import { showToast } from "./Toast"
import { capitalize } from "../utils/textUtils"
import "./ListaProductosVanilla.css"

const ListaProductosVanilla = React.memo(({ personaSeleccionada, agregarProducto }) => {
    const { productos } = useProductos()
    const [expanded, setExpanded] = React.useState(false)

    const handleAgregar = (producto) => {
        if (!personaSeleccionada) {
            showToast("Selecciona una persona antes de agregar productos", "warning")
            return
        }
        agregarProducto(producto)
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
                                <div className="productos-grid">
                                    {subcategorias.productos.map((producto) => (
                                        <div
                                            key={producto.id}
                                            className="producto-card"
                                            onClick={() => handleAgregar(producto)}
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
                                    <div className="productos-grid">
                                        {items.map((producto) => (
                                            <div
                                                key={producto.id}
                                                className="producto-card"
                                                onClick={() => handleAgregar(producto)}
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