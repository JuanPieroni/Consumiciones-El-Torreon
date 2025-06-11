import React from "react"

const ResumenConsumo = ({ consumos, eliminarProducto }) => {
    return (
        <>
            <div
                style={{
                    border: "2px dashed #888",
                    padding: "10px",
                    margin: "10px",
                    backgroundColor: "#f0f0f0",
                }}
            >
                <h3>Resumen de consumos</h3>
                {Object.keys(consumos).length === 0 && (
                    <p>No hay consumos aún</p>
                )}

                {Object.entries(consumos).map(([persona, productos]) => {
                    const total = productos.reduce(
                        (acc, item) => acc + item.precio,
                        0
                    )

                    return (
                        <div key={persona}>
                            <h4>{persona}</h4>
                            {productos.length === 0 ? (
                                <p>No consumió nada</p>
                            ) : (
                                <ul>
                                    {productos.map(
                                        ({ id, nombre, precio }, idx) => (
                                            <li key={`${id}-${idx}`}>
                                                {nombre}${precio}
                                                <button
                                                    onClick={() =>
                                                        eliminarProducto(
                                                            persona,
                                                            idx
                                                        )
                                                    }
                                                >
                                                    Eliminar
                                                </button>
                                            </li>
                                        )
                                    )}
                                    <h4>
                                        Total {persona}:  ${total}
                                    </h4>
                                </ul>
                            )}
                        </div>
                    )
                })}
                <div>
                    Gran Total: $
                    {Object.values(consumos).reduce(
                        (acc, productos) =>
                            acc +
                            productos.reduce(
                                (sum, item) => sum + item.precio,
                                0
                            ),
                        0
                    )}
                </div>
            </div>
        </>
    )
}

export default ResumenConsumo
