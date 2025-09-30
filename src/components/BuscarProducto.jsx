import React, { useEffect, useState } from "react"
import { supabase } from "../supabaseClient"

const BuscarProducto = ({ personaSeleccionada, agregarProducto }) => {
    const [productos, setProductos] = useState([])
    const [filtro, setFiltro] = useState("")

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

    return (
        <div className="paper">
            <input
                className="input"
                placeholder="Buscar producto o categoria"
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
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
                                {prod.nombre}
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
                                {prod.categoria}
                            </p>
                            {prod.subcategoria && (
                                <p style={{
                                    color: "#616161",
                                    fontSize: "0.8rem",
                                    margin: "4px 0"
                                }}>
                                    {prod.subcategoria}
                                </p>
                            )}

                            {personaSeleccionada && (
                                <button
                                    className="btn btn-text"
                                    style={{
                                        marginTop: "8px",
                                        color: "hsla(8, 86%, 46%, 0.51)",
                                        border: "1px solid black"
                                    }}
                                    onClick={() => agregarProducto(prod)}
                                >
                                    Agregar a {personaSeleccionada}
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            ) : filtro.trim() ? (
                <p style={{ marginTop: "16px", color: "#616161" }}>
                    No se encontraron productos que coincidan.
                </p>
            ) : null}
        </div>
    )
}

export default BuscarProducto
