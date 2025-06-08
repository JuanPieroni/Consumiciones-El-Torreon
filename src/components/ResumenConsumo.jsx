import React from "react"
import styles from "./ResumenConsumo.module.css"
const ResumenConsumo = ({ consumos, eliminarProducto }) => {
    return (
        <div className={styles.container}>
            <h3 className={styles.titulo}>Resumen de consumos</h3>
            {Object.keys(consumos).length === 0 && <p>No hay consumos aún</p>}

            {Object.entries(consumos).map(([persona, productos]) => {
                const total = productos.reduce(
                    (acc, item) => acc + item.precio,
                    0
                )

                return (
                    <div key={persona} className={styles.persona} >
                        <h4 className={styles.nombre}>{persona}</h4>
                        {productos.length === 0 ? (
                            <p>No consumió nada</p>
                        ) : (
                            <ul className={styles.lista}>
                                {productos.map(
                                    ({ id, nombre, precio }, idx) => (
                                        <li className={styles.item} key={`${id}-${idx}`}>
                                            {nombre} (${precio}){" "}
                                            <button
                                            className={styles.eliminar}
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
                                   Total: ${total}
                                </h4>
                            </ul>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export default ResumenConsumo
