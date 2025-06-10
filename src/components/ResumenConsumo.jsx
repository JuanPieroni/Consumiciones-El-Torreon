import React from "react"
 
const ResumenConsumo = ({ consumos, eliminarProducto }) => {
    return (
        <div >
            <h3  >Resumen de consumos</h3>
            {Object.keys(consumos).length === 0 && <p>No hay consumos aún</p>}

            {Object.entries(consumos).map(([persona, productos]) => {
                const total = productos.reduce(
                    (acc, item) => acc + item.precio,
                    0
                )

                return (
                    <div key={persona}  >
                        <h4 >{persona}</h4>
                        {productos.length === 0 ? (
                            <p>No consumió nada</p>
                        ) : (
                            <ul >
                                {productos.map(
                                    ({ id, nombre, precio }, idx) => (
                                        <li
                                            
                                            key={`${id}-${idx}`}
                                        >
                                            {nombre} (${precio}){" "}
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
                                <h4>Total: ${total}</h4>
                            </ul>
                        )}

                    </div>
                )
            })}
        </div>
    )
}

export default ResumenConsumo
